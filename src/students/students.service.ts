import {
  ConflictException,
  forwardRef,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { Student } from './entities/student.entity';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { applyDataToEntity } from '../utils/apply-data-to-entity';
import { PageOptionsDto } from '../common/dtos/page/page-options.dto';
import { PageDto } from '../common/dtos/page/page.dto';
import { PageMetaDto } from '../common/dtos/page/page-meta.dto';
import { UserRole } from '../enums/user-role.enums';
import { RegisterStudentDto } from './dto/register-student.dto';
import { MailService } from '../mail/mail.service';
import { DataSource } from 'typeorm';

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
    try {
      newStudent.user = await this.usersService.create({
        email,
        role: UserRole.STUDENT,
      });
      await newStudent.save();
      await this.mailService.sendMail(
        email,
        'Rejestracja w Head Hunter',
        './register',
        {
          registrationLink: `${process.env.STUDENT_REGISTRATION_URL}/${newStudent.id}`,
        },
      );
    } catch (e) {
      await newStudent.remove();
      await this.usersService.remove(newStudent.user.id);
      throw new HttpException(
        'Something went wrong by sending the email. User has not been added',
        HttpStatus.BAD_REQUEST,
      );
    }
    return newStudent;
  }

  async findAllActive(pageOptions: PageOptionsDto): Promise<PageDto<Student>> {
    const queryBuilder = await this.dataSource
      .getRepository(Student)
      .createQueryBuilder('student')
      .innerJoinAndSelect('student.user', 'user', 'user.isActive = :isActive', {
        isActive: true,
      })
      .skip(pageOptions.skip)
      .take(pageOptions.take);

    const itemCount = await queryBuilder.getCount();
    const { entities } = await queryBuilder.getRawAndEntities();

    const pageMetaDto = new PageMetaDto({ itemCount, pageOptions });

    return new PageDto(entities, pageMetaDto);
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
    return this.findOne(id);
  }
}
