import { Module } from '@nestjs/common';
import { UploadService } from './upload.service';
import { UsersModule } from '../users/users.module';
import { UploadController } from './upload.controller';
import { MailModule } from '../mail/mail.module';

@Module({
  imports: [UsersModule, MailModule],
  controllers: [UploadController],
  providers: [UploadService],
})
export class UploadModule {}
