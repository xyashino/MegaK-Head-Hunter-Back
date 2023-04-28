import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { UpdateInterviewDto } from './dto/update-interview.dto';
import { Interview } from './entities/interview.entity';
import { UsersService } from '../users/users.service';
import { StudentsService } from '../students/students.service';
import { StudentStatus } from '../enums/student-status.enums';
import { HrService } from '../hr/hr.service';

@Injectable()
export class InterviewService {
  @Inject(UsersService) usersService: UsersService;
  @Inject(StudentsService) studentsService: StudentsService;
  @Inject(HrService) hrService: HrService;

  async createInterview(studentId, user) {
    const newInterview = new Interview();
    const hr = await this.hrService.getCurrentHr(user);
    const student = await this.studentsService.findOne(studentId);

    if ((await this.getCountInterview(hr)) >= hr.maxReservedStudents) {
      throw new HttpException(
        'The maximum number of interview bookings has been reached',
        HttpStatus.CONFLICT,
      );
    }

    if (student.status === StudentStatus.HIRED) {
      throw new HttpException(
        'The student was hired. Cannot be added to the interview',
        HttpStatus.CONFLICT,
      );
    }

    newInterview.hr = hr;
    newInterview.student = student;

    if (student.status === StudentStatus.AVAILABE) {
      student.status = StudentStatus.CONVERSATION;
      await student.save();
    }

    await newInterview.save();
    return { message: 'Added to the interview' };
  }

  async getCountInterview(hr) {
    const interviews = await Interview.find({
      where: { hr },
    });
    return interviews.length;
  }

  async removeInterview(studentId, user) {
    const hr = await this.hrService.getCurrentHr(user);
    const student = await this.studentsService.findOne(studentId);
  }

  async findAll() {
    return await Interview.find({
      relations: { hr: true },
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} interview`;
  }

  update(id: number, updateInterviewDto: UpdateInterviewDto) {
    return `This action updates a #${id} interview`;
  }
}
