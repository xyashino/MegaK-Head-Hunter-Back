import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFiles,
} from '@nestjs/common';
import { UploadService } from './upload.service';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { multerStorage, storageDir } from '../utils/storage';
import * as path from 'path';
import { MulterDiskUploadedFiles } from '../interfaces/files';

@Controller('upload')
export class UploadController {
  constructor(private readonly adminService: UploadService) {}

  @Post('/file')
  @UseInterceptors(
    FileFieldsInterceptor([{ name: 'uploadStudents', maxCount: 1 }], {
      storage: multerStorage(path.join(storageDir(), 'students')),
    }),
  )
  uploadStudents(@UploadedFiles() files: MulterDiskUploadedFiles) {
    return this.adminService.uploadStudents(files);
  }
}
