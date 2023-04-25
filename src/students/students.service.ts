import {
  ConflictException,
  Inject,
  Injectable,
  forwardRef,
} from '@nestjs/common';
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
    await this.checkConflictData(email);
    const newStudent = new Student();
    applyDataToEntity(newStudent, rest);

    newStudent.email = email;
    const addedStudent = await newStudent.save();
    return addedStudent;
  }

  findAll() {
    return Student.find();
  }

  async findOne(id: string) {
    const student = await Student.findOneBy({ id });
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

  private async checkConflictData(email: string): Promise<void> {
    const studentExist = await Student.findOneBy({ email });
    if (studentExist) throw new ConflictException('Email is taken');
  }
}
