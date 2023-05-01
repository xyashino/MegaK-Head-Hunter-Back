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
import { ResponseAvailableStudentsDto } from './dto/response-available-students.dto';
import { sendLinkRegistration } from '../utils/send-link-registration';
import { StudentStatus } from '../enums/student-status.enums';
import { searchUsersPagination } from '../utils/search-users-pagination';

@Injectable()
export class StudentsService {
  @Inject(forwardRef(() => UsersService))
  usersService: UsersService;
  @Inject(forwardRef(() => MailService))
  mailService: MailService;
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

  async findAllAvailable(
    searchOptions: SearchAndPageOptionsDto,
  ): Promise<ResponseAvailableStudentsDto> {
    return await searchUsersPagination(
      searchOptions,
      await this.dataSource
        .getRepository(Student)
        .createQueryBuilder('student')
        .innerJoinAndSelect(
          'student.user',
          'user',
          'user.isActive = :isActive',
          {
            isActive: true,
          },
        )
        .where('student.status = :status', { status: StudentStatus.AVAILABE })
        .skip(searchOptions.skip)
        .take(searchOptions.take),
    );
  }

  async findOne(id: string) {
    const student = await Student.findOne({
      where: { id },
      relations: { user: true },
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
    applyDataToEntity(student, rest);
    return student.save();
  }
  async register(id: string, { pwd, ...rest }: RegisterStudentDto) {
    const student = await this.findOne(id);
    if (student.user.isActive)
      throw new ConflictException('The user has been registered');
    await this.usersService.update(student.user.id, { pwd });
    applyDataToEntity(student, rest);
    await student.save();
  }
}
