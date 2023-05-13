import {
  forwardRef,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Interview } from './entities/interview.entity';
import { UsersService } from '@users/users.service';
import { StudentsService } from '@students/students.service';
import { StudentStatus } from '@enums/student-status.enums';
import { DataSource } from 'typeorm';
import { User } from '@users/entities/user.entity';
import { UserRole } from '@enums/user-role.enums';
import { InterviewResponse } from '@types';
import { FiltrationService } from '@filtration/filtration.service';
import { PageMetaDto } from '@dtos/page/page-meta.dto';
import { SearchOptionsDto } from '@dtos/page/search-options.dto';

@Injectable()
export class InterviewService {
  @Inject(forwardRef(() => UsersService))
  private  readonly usersService: UsersService;
  @Inject(forwardRef(() => StudentsService))
  private readonly studentsService: StudentsService;
  @Inject(forwardRef(() => DataSource))
  private readonly dataSource: DataSource;
  @Inject(forwardRef(() => FiltrationService))
  private readonly filtrationService: FiltrationService;

  async createInterview(
    studentId: string,
    user: User,
  ): Promise<InterviewResponse> {
    const newInterview = new Interview();
    const hr = (await this.usersService.findOne(user.id)).hr;
    const student = await this.studentsService.findOne(studentId);

    if ((await this.getCountInterview(hr)) >= hr.maxReservedStudents) {
      throw new HttpException(
        'The maximum number of interview bookings has been reached',
        HttpStatus.CONFLICT,
      );
    }

    if (student.status === StudentStatus.HIRED) {
      throw new HttpException(
        'The student was hired. Cannot be added to the interview',
        HttpStatus.CONFLICT,
      );
    }
    if (student.status === StudentStatus.CONVERSATION) {
      throw new HttpException(
        'The student is currently on the conversation. Cannot be added to the interview',
        HttpStatus.CONFLICT,
      );
    }

    newInterview.hr = hr;
    newInterview.student = student;

    if (student.status === StudentStatus.AVAILABE) {
      student.status = StudentStatus.CONVERSATION;
      await student.save();
    }

    return await newInterview.save();
  }

  async getCountInterview(hr): Promise<number> {
    const interviews = await this.findInterview(hr);
    return interviews.length;
  }

  async findInterview(hr): Promise<InterviewResponse[]> {
    return await Interview.find({ where: { hr } });
  }

  async findAllInterview(searchOptions: SearchOptionsDto, user) {
    const queryBuilder = await this.dataSource
      .getRepository(Interview)
      .createQueryBuilder('interview')
      .leftJoinAndSelect('interview.student', 'student')
      .leftJoinAndSelect('interview.hr', 'hr')
      .skip(searchOptions.skip)
      .take(searchOptions.take);

    switch (user.role) {
      case UserRole.HR:
        const hr = (await this.usersService.findOne(user.id)).hr;
        queryBuilder.andWhere('interview.hr = :hrId', { hrId: hr.id });
        break;
      case UserRole.STUDENT:
        const student = (await this.usersService.findOne(user.id)).student;
        queryBuilder.andWhere('interview.student = :studentId', {
          studentId: student.id,
        });
    }

    const filterQueryBuilder =
      await this.filtrationService.filterStudentPreferences(
        searchOptions,
        queryBuilder,
      );

    const itemCount = await filterQueryBuilder.getCount();
    const { entities } = await filterQueryBuilder.getRawAndEntities();
    const pageMetaDto = new PageMetaDto({ searchOptions, itemCount });
    return { data: entities, meta: { ...pageMetaDto } };
  }

  async removeInterview(
    studentId: string,
    user: User,
  ): Promise<InterviewResponse[]> {
    const hr =
      user.role === UserRole.HR
        ? (await this.usersService.findOne(user.id)).hr
        : user;

    const student = await this.studentsService.findOne(studentId);
    const interview = await Interview.find({
      where: {
        hr: { id: hr.id },
        student: { id: studentId },
      },
    });
    if (student.status === StudentStatus.CONVERSATION) {
      student.status = StudentStatus.AVAILABE;
      await student.save();
    }
    return await Interview.remove(interview);
  }

  async findOne(id: string) {
    const interview = await Interview.findOne({
      relations: { hr: true },
      where: { id },
    });
    if (!interview) throw new NotFoundException('Invalid interview id');
    return interview;
  }
}
