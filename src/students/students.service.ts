import { Inject, Injectable, forwardRef } from '@nestjs/common';
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
}
