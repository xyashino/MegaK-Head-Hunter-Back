import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { Student } from './entities/student.entity';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { applyDataToEntity } from '../utils/apply-data-to-entity';
import { PageOptionsDto } from '../common/dtos/page/page-options.dto';
import { PageDto } from '../common/dtos/page/page.dto';
import { PageMetaDto } from '../common/dtos/page/page-meta.dto';

@Injectable()
export class StudentsService {
  @Inject(forwardRef(() => UsersService))
  usersService: UsersService;
  async create({ email, ...rest }: CreateStudentDto) {
    const newStudent = new Student();
    applyDataToEntity(newStudent, rest);

    const addedStudent = await newStudent.save();
    return addedStudent;
  }

  async findAll(pageOptions: PageOptionsDto): Promise<PageDto<Student>> {
    const queryBuilder = Student.createQueryBuilder('student')
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
    return student;
  }

  async remove(id: string) {
    const student = await this.findOne(id);
    return student.remove();
  }

  async update(id: string, { ...rest }: UpdateStudentDto) {
    const student = await this.findOne(id);

    applyDataToEntity(student, rest);
    const updatedStudent = await student.save();

    return updatedStudent;
  }
}
