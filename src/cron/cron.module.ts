import { forwardRef, Module } from '@nestjs/common';
import { CronService } from './cron.service';
import { ScheduleModule } from '@nestjs/schedule';
import { StudentsModule } from '@students/students.module';

@Module({
  imports: [ScheduleModule.forRoot(), forwardRef(() => StudentsModule)],
  providers: [CronService],
})
export class CronModule {}
