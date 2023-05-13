import {
  ConflictException,
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UsersService } from '@users/users.service';
import { Student } from './entities/student.entity';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { applyDataToEntity } from '@utils/apply-data-to-entity';
import { UserRole } from '@enums/user-role.enums';
import { RegisterStudentDto } from './dto/register-student.dto';
import { MailService } from '@mail/mail.service';
import { DataSource } from 'typeorm';
import { StudentStatus } from '@enums/student-status.enums';
import { UserStatus } from '@enums/user-status.enums';
import { InterviewService } from '@interview/interview.service';
import { Response } from 'express';
import { AuthService } from '@auth/auth.service';
import { Interview } from '@interview/entities/interview.entity';
import {FiltrationService} from "@filtration/filtration.service";
import {SearchOptionsDto} from "@dtos/page/search-options.dto";
import {PageMetaDto} from "@dtos/page/page-meta.dto";

@Injectable()
export class StudentsService {
  @Inject(forwardRef(() => UsersService))
  usersService: UsersService;
  @Inject(forwardRef(() => MailService))
  mailService: MailService;
  @Inject(forwardRef(() => InterviewService))
  interviewService: InterviewService;
  @Inject(forwardRef(() => AuthService))
  authService: AuthService;
  @Inject(forwardRef(() => FiltrationService))
  filtrationService: FiltrationService;
  @Inject(DataSource) private dataSource: DataSource;

  async create({ email, ...rest }: CreateStudentDto) {
    const newStudent = new Student();
    applyDataToEntity(newStudent, rest);
    newStudent.user = await this.usersService.create({
      email,
      role: UserRole.STUDENT,
      ...rest,
    });
    await newStudent.save();
    await this.mailService.sendRegistrationLink(
      email,
      newStudent.id,
      process.env.STUDENT_REGISTRATION_URL,
      newStudent,
      newStudent.user,
    );
    return newStudent;
  }

  async findAll(searchOptions: SearchOptionsDto, user) {
    const queryBuilder = await this.dataSource
      .createQueryBuilder()
      .select('student')
      .from(Student, 'student')
      .innerJoinAndSelect('student.user', 'user')
      .skip(searchOptions.skip)
      .take(searchOptions.take);
    if (user.role === UserRole.HR) {
      queryBuilder.andWhere(
        'user.isActive = :isActive AND student.status = :studentStatus',
        {
          isActive: UserStatus.ACTIVE,
          studentStatus: StudentStatus.AVAILABE,
        },
      );
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

  async findOne(id: string) {
    const student = await Student.findOne({
      where: { id },
      relations: { user: true, interviews: true },
    });
    if (!student) throw new NotFoundException('Invalid student Id');
    return student;
  }

  async remove(id: string) {
    const student = await this.findOne(id);
    const result = await student.remove();
    await this.usersService.remove(student.user.id);
    return result;
  }

  async update(id: string, { email, status, ...rest }: UpdateStudentDto) {
    const student = await this.findOne(id);
    if (status === StudentStatus.HIRED) {
      const user = student.user;
      user.isActive = UserStatus.INACTIVE;
      await user.save();
      await this.checkAndDeleteInterviews(student.interviews, student.id);
    }
    applyDataToEntity(student, rest);
    return student.save();
  }
  async register(
    id: string,
    { pwd, ...rest }: RegisterStudentDto,
    res: Response,
  ) {
    try {
      const student = await this.findOne(id);
      if (student.user.isActive)
        throw new ConflictException('The user has been registered');
      await this.usersService.update(student.user.id, { pwd });
      applyDataToEntity(student, rest);
      await student.save();
      const authLoginDto = { email: student.user.email, pwd };
      await this.authService.login(authLoginDto, res);
    } catch (e) {
      return res.json({ error: e.message });
    }
  }



  private async checkAndDeleteInterviews(
    interviews: Interview[],
    studentId: string,
  ) {
    if (interviews.length > 0) {
      for (const interview of interviews) {
        const hr = (await this.interviewService.findOne(interview.id)).hr;
        await this.interviewService.removeInterview(studentId, hr);
      }
    }
  }
}
