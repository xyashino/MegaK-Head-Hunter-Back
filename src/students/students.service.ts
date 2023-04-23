import { Inject, Injectable, NotFoundException, forwardRef } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { Student } from './entities/student.entity';
import { CreateStudentDto } from './dto/create-student.dto';

@Injectable()
export class StudentsService {
  @Inject(forwardRef(() => UsersService))
  usersService: UsersService;
  async create({
    email,
    firstname,
    lastname,
    githubUsername,
    projectUrls,
    ...rest
  }: CreateStudentDto) {
    const newStudent = new Student();
    newStudent.email = email;
    newStudent.firstname = firstname;
    newStudent.lastname = lastname;
    newStudent.githubUsername = githubUsername;
    newStudent.projectUrls = projectUrls;
    const addedStudent = await newStudent.save();
    return addedStudent;
  }

  findAll() {
    return Student.find();
  }

  async findOne(id: string) {
    const student = await Student.findOne({
      where: { id },
    });
    if (!student)
      throw new NotFoundException('Student with given id does not exist');
    return student;
  }
}
