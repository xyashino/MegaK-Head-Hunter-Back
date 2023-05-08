import {
  ConflictException,
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { Student } from './entities/student.entity';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { applyDataToEntity } from '../utils/apply-data-to-entity';
import { SearchAndPageOptionsDto } from '../common/dtos/page/search-and-page-options.dto';
import { UserRole } from '../common/enums/user-role.enums';
import { RegisterStudentDto } from './dto/register-student.dto';
import { MailService } from '../mail/mail.service';
import { DataSource } from 'typeorm';
import { sendLinkRegistration } from '../utils/send-link-registration';
import { StudentStatus } from '../common/enums/student-status.enums';
import { searchUsersPagination } from '../utils/search-users-pagination';
import { UserStatus } from '../common/enums/user-status.enums';
import { InterviewService } from '../interview/interview.service';
import { Response } from 'express';
import { AuthService } from '../auth/auth.service';
import { User } from '../users/entities/user.entity';

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
  @Inject(DataSource) private dataSource: DataSource;

  async create({ email, ...rest }: CreateStudentDto) {
    const newStudent = new Student();
    applyDataToEntity(newStudent, rest);
    const newUser = await this.usersService.create({
      email,
      role: UserRole.STUDENT,
      ...rest,
    });
    newStudent.user = newUser;
    await newStudent.save();
    await sendLinkRegistration(
      email,
      newStudent,
      process.env.STUDENT_REGISTRATION_URL,
      this.usersService,
      this.mailService,
    );
    return newStudent;
  }

  async findAll(searchOptions: SearchAndPageOptionsDto, user) {
    const queryBuilder = await this.dataSource
      .getRepository(Student)
      .createQueryBuilder('student')
      .innerJoinAndSelect('student.user', 'user')
      .skip(searchOptions.skip)
      .take(searchOptions.take);

    if (user.role === UserRole.HR) {
      queryBuilder.where(
        'user.isActive = :isActive AND student.status = :studentStatus',
        {
          isActive: UserStatus.ACTIVE,
          studentStatus: StudentStatus.AVAILABE,
        },
      );
    }
    return await searchUsersPagination(searchOptions, queryBuilder);
  }

  async findOne(id: string) {
    const student = await Student.findOne({
      where: { id },
      relations: { user: true, interviews: true },
    });
    if (!student) throw new NotFoundException('Invalid student id');
    return student;
  }

  async remove(id: string) {
    const student = await this.findOne(id);
    const result = await student.remove();
    await this.usersService.remove(student.user.id);
    return result;
  }

  async update(id: string, { email, ...rest }: UpdateStudentDto) {
    const student = await this.findOne(id);
    if (rest.status === StudentStatus.HIRED) {
      const user = student.user;
      user.isActive = UserStatus.INACTIVE;
      await user.save();
      const interviews = student.interviews;
      if (interviews.length > 0) {
        for (const interview of interviews) {
          const hr = (await this.interviewService.findOne(interview.id)).hr;
          await this.interviewService.removeInterview(student.id, hr);
        }
      }
      const admins = await User.find({ where: { role: UserRole.ADMIN } });
      for (const admin of admins) {
        try {
          await this.mailService.sendMail(
            admin.email,
            'Powiadomienie o zatrudnieniu kursanta',
            './admin-info',
            {
              studentInfo: {
                id: student.id,
                firstname: student.firstname,
                lastname: student.lastname,
              },
            },
          );
        } catch (e) {
          console.log(e);
        }
      }
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
}
