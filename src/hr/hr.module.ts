import { forwardRef, Module } from '@nestjs/common';
import { HrService } from './hr.service';
import { HrController } from './hr.controller';
import { UsersModule } from '../users/users.module';
import { MailModule } from '../mail/mail.module';
import { InterviewModule } from '../interview/interview.module';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    UsersModule,
    MailModule,
    forwardRef(() => InterviewModule),
    forwardRef(() => AuthModule),
  ],
  controllers: [HrController],
  providers: [HrService],
  exports: [HrService],
})
export class HrModule {}
