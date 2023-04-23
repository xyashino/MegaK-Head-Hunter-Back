import { Module } from '@nestjs/common';
import { UploadService } from './upload.service';
import { UsersModule } from '../users/users.module';
import { UploadController } from './upload.controller';

@Module({
  imports: [UsersModule],
  controllers: [UploadController],
  providers: [UploadService],
})
export class UploadModule {}
