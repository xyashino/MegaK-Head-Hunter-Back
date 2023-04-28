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
import { PageMetaDto } from '../common/dtos/page/page-meta.dto';
import { UserRole } from '../enums/user-role.enums';
import { RegisterStudentDto } from './dto/register-student.dto';
import { MailService } from '../mail/mail.service';
import { DataSource } from 'typeorm';
import { ResponsePaginationStudentsDto } from './dto/response-pagination-students.dto';
import { userRegistration } from '../utils/user-registration';

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
    await userRegistration(
      email,
      newStudent,
      UserRole.STUDENT,
      process.env.STUDENT_REGISTRATION_URL,
      this.usersService,
      this.mailService,
    );
    return newStudent;
  }

  async findAllActive(
    searchOptions: SearchAndPageOptionsDto,
  ): Promise<ResponsePaginationStudentsDto> {
    const { name, skip, take } = searchOptions;
    const queryBuilder = await this.dataSource
      .getRepository(Student)
      .createQueryBuilder('student')
      .innerJoinAndSelect('student.user', 'user', 'user.isActive = :isActive', {
        isActive: true,
      })

      .skip(skip)
      .take(take);

    if (name) {
      queryBuilder.where(
        'student.firstname LIKE :name OR student.lastname LIKE :name',
        {
          name: `%${name}%`,
        },
      );
    }

    const itemCount = await queryBuilder.getCount();
    const { entities } = await queryBuilder.getRawAndEntities();
    const pageMetaDto = new PageMetaDto({ searchOptions, itemCount });
    return { data: entities, meta: { ...pageMetaDto } };
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
    return student.save();
  }
}
