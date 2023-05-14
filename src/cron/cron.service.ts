import { Inject, Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { StudentsService } from '@students/students.service';
import { Interview } from '@interview/entities/interview.entity';
import { DataSource } from 'typeorm';
import { StudentStatus } from '@enums/student-status.enums';

@Injectable()
export class CronService {
  @Inject(StudentsService) studentsService: StudentsService;
  @Inject(DataSource) dataSource: DataSource;

  @Cron('0 2 * * *') // "At 02:00"
  async removeInterview(): Promise<void> {
    const interviews = await Interview.find();
    const currentDate = new Date();

    for (const interview of interviews) {
      if (interview.bookingDate < currentDate) {
        const queryBuilder = await this.dataSource
          .getRepository(Interview)
          .createQueryBuilder('interview')
          .leftJoinAndSelect('interview.student', 'student');

        const interviewInfo = await queryBuilder.getOne();

        const student = await this.studentsService.findOne(
          interviewInfo.student.id,
        );

        student.status = StudentStatus.AVAILABE;
        const interviewId = interview.id;
        await interview.remove();
        await student.save();

        console.log(
          `Today removed interview ${interviewId}  and student ${student.firstname} ${student.lastname} is available`,
        );
      }
    }
  }
}
