import { forwardRef, Module } from '@nestjs/common';
import { CronService } from './cron.service';
import { ScheduleModule } from '@nestjs/schedule';
import { InterviewModule } from '../interview/interview.module';
import { StudentsModule } from '../students/students.module';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    forwardRef(() => InterviewModule),
    forwardRef(() => StudentsModule),
  ],
  providers: [CronService],
})
export class CronModule {}
