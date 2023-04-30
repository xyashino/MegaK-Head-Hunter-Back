import { forwardRef, Module } from '@nestjs/common';
import { HrService } from './hr.service';
import { HrController } from './hr.controller';
import { UsersModule } from '../users/users.module';
import { MailModule } from '../mail/mail.module';
import { InterviewModule } from '../interview/interview.module';

@Module({
  imports: [UsersModule, MailModule, forwardRef(() => InterviewModule)],
  controllers: [HrController],
  providers: [HrService],
  exports: [HrService],
})
export class HrModule {}
