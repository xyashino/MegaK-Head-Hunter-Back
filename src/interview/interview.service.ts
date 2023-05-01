import {
  forwardRef,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Interview } from './entities/interview.entity';
import { UsersService } from '../users/users.service';
import { StudentsService } from '../students/students.service';
import { StudentStatus } from '../enums/student-status.enums';
import { HrService } from '../hr/hr.service';
import { SearchAndPageOptionsDto } from '../common/dtos/page/search-and-page-options.dto';
import { DataSource } from 'typeorm';
import { searchUsersPagination } from '../utils/search-users-pagination';
import { User } from '../users/entities/user.entity';
import { ResponseInterviewAndStudentsDto } from './dto/resoponse-interview-and-students.dto';
import { CreateInterviewResponseDto } from './dto/create-interview-response.dto';

@Injectable()
export class InterviewService {
  @Inject(UsersService) usersService: UsersService;
  @Inject(StudentsService) studentsService: StudentsService;
  @Inject(forwardRef(() => HrService)) hrService: HrService;
  @Inject(DataSource) private dataSource: DataSource;

  async createInterview(
    studentId: string,
    user: User,
  ): Promise<CreateInterviewResponseDto> {
    const newInterview = new Interview();
    const hr = await this.hrService.getCurrentHr(user);
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

  async findInterview(hr): Promise<Interview[]> {
    return await Interview.find({ where: { hr } });
  }

  async findInterviewAndStudents(
    searchOptions: SearchAndPageOptionsDto,
    user,
  ): Promise<ResponseInterviewAndStudentsDto> {
    const hr = await this.hrService.getCurrentHr(user);

    return await searchUsersPagination(
      searchOptions,
      await this.dataSource
        .getRepository(Interview)
        .createQueryBuilder('interview')
        .leftJoinAndSelect('interview.student', 'student')
        .where('interview.hr = :hrId', { hrId: hr.id })
        .skip(searchOptions.skip)
        .take(searchOptions.take),
    );
  }

  async removeInterview(studentId, user) {
    const hr = await this.hrService.getCurrentHr(user);
    const student = await this.studentsService.findOne(studentId);
    const interview = await Interview.find({
      where: {
        hr: { id: hr.id },
        student: { id: studentId },
      },
    });
    const data = await Interview.remove(interview);
    student.status = StudentStatus.AVAILABE;
    await student.save();
    return data;
  }

  async findAll(): Promise<Interview[]> {
    return await Interview.find();
  }

  async findOne(id: string): Promise<Interview> {
    const interview = await Interview.findOneBy({
      id,
    });
    if (!interview) {
      throw new NotFoundException('Invalid interview id');
    }
    return interview;
  }

  async update(id: string): Promise<Interview> {
    const interview = await this.findOne(id);
    interview.booking_date = new Date();
    return interview.save();
  }
}
