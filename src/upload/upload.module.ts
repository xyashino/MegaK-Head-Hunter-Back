import { Module } from '@nestjs/common';
import { UploadService } from './upload.service';
import { UploadController } from './upload.controller';
import { MailModule } from '@mail/mail.module';
import { StudentsModule } from '@students/students.module';

@Module({
  imports: [MailModule, StudentsModule],
  controllers: [UploadController],
  providers: [UploadService],
})
export class UploadModule {}
