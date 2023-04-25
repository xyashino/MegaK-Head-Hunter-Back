import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { Student } from './entities/student.entity';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { applyDataToEntity } from '../utils/apply-data-to-entity';

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

  findAll() {
    return Student.find({ relations: { user: true } });
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
    const updadedStudent = await student.save();

    return updadedStudent;
  }
}
