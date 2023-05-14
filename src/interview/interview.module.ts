import { forwardRef, Module } from '@nestjs/common';
import { InterviewService } from './interview.service';
import { InterviewController } from './interview.controller';
import { UsersModule } from '@users/users.module';
import { StudentsModule } from '@students/students.module';
import { HrModule } from '@hr/hr.module';
import { FiltrationModule } from '@filtration/filtration.module';

@Module({
  imports: [
    UsersModule,
    StudentsModule,
    forwardRef(() => HrModule),
    FiltrationModule,
  ],
  controllers: [InterviewController],
  providers: [InterviewService],
  exports: [InterviewService],
})
export class InterviewModule {}
