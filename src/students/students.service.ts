import {
  ForbiddenException,
  Inject,
  Injectable,
  NotFoundException,
  forwardRef,
} from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { Student } from './entities/student.entity';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';

@Injectable()
export class StudentsService {
  @Inject(forwardRef(() => UsersService))
  usersService: UsersService;
  async create({
    email,
    courseCompletion,
    courseEngagment,
    projectDegree,
    teamProjectDegree,
    bonusProjectUrls,
    firstname,
    lastname,
    githubUsername,
    projectUrls,
    ...rest
  }: CreateStudentDto) {
    const newStudent = new Student();
    newStudent.email = email;
    newStudent.courseCompletion = courseCompletion;
    newStudent.courseEngagment = courseEngagment;
    newStudent.projectDegree = projectDegree;
    newStudent.teamProjectDegree = teamProjectDegree;
    newStudent.bonusProjectUrls = bonusProjectUrls;
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
    this.checkStudentExist(student);
    return student;
  }

  async remove(id: string) {
    const student = await this.findOne(id);
    this.checkStudentExist(student);
    return student.remove();
  }

  async update(id: string, { ...rest }: UpdateStudentDto) {
    const student = await this.findOne(id);
    this.checkStudentExist(student);

    this.updateAllData(student, rest);
    const updadedStudent = await student.save();

    return updadedStudent;
  }

  private updateAllData(
    currStudentData: CreateStudentDto,
    data: any,
  ) /*poprawić typy*/ {
    for (const [key, value] of Object.entries(data)) {
      currStudentData[key] = value;
    }
  }

  private checkStudentExist(student) {
    if (!student)
      throw new NotFoundException('Student with given id does not exist');
  }
}
