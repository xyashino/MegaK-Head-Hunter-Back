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
import { UserRole } from '../enums/user-role.enums';
import { RegisterStudentDto } from './dto/register-student.dto';
import { MailService } from '../mail/mail.service';
import { DataSource } from 'typeorm';
import { ResponseFindAllStudentsDto } from './dto/response-find-all-students.dto';
import { sendLinkRegistration } from '../utils/send-link-registration';
import { StudentStatus } from '../enums/student-status.enums';
import { searchUsersPagination } from '../utils/search-users-pagination';
import { UserStatus } from '../enums/user-status.enums';
import { InterviewService } from '../interview/interview.service';

@Injectable()
export class StudentsService {
  @Inject(forwardRef(() => UsersService))
  usersService: UsersService;
  @Inject(forwardRef(() => MailService))
  mailService: MailService;
  @Inject(forwardRef(() => InterviewService))
  interviewService: InterviewService;
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

  async findAll(
    searchOptions: SearchAndPageOptionsDto,
    user,
  ): Promise<ResponseFindAllStudentsDto> {
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
    if (!student) throw new NotFoundException('Invalid student Id');
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
      //@TODO dodać informacje dla admina o zatrudnieniu
    }
    applyDataToEntity(student, rest);
    return student.save();
  }
  async register(id: string, { pwd, ...rest }: RegisterStudentDto) {
    const student = await this.findOne(id);
    if (student.user.isActive)
      throw new ConflictException('The user has been registered');
    await this.usersService.update(student.user.id, { pwd });
    applyDataToEntity(student, rest);
    return student.save();
  }
}
