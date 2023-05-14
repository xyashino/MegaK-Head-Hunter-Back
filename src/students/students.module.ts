import { forwardRef, Module } from '@nestjs/common';
import { StudentsService } from './students.service';
import { StudentsController } from './students.controller';
import { UsersModule } from '@users/users.module';
import { MailModule } from '@mail/mail.module';
import { InterviewModule } from '@interview/interview.module';
import { AuthModule } from '@auth/auth.module';
import {FiltrationModule} from "@filtration/filtration.module";

@Module({
  imports: [
    UsersModule,
    MailModule,
    forwardRef(() => FiltrationModule),
    forwardRef(() => InterviewModule),
    forwardRef(() => AuthModule),
  ],
  controllers: [StudentsController],
  providers: [StudentsService],
  exports: [StudentsService],
})
export class StudentsModule {}
