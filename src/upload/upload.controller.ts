import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFiles,
} from '@nestjs/common';
import { UploadService } from './upload.service';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { fileFilter, fileLimits } from '../utils/file-filters';
import { MulterMemoryUploadedFiles } from '../interfaces/files';

@Controller('upload')
export class UploadController {
  constructor(private readonly adminService: UploadService) {}

  @Post('/file')
  @UseInterceptors(
    FileFieldsInterceptor([{ name: 'uploadStudents', maxCount: 1 }], {
      limits: fileLimits,
      fileFilter: fileFilter,
    }),
  )
  uploadStudents(@UploadedFiles() file: MulterMemoryUploadedFiles) {
    return this.adminService.uploadStudents(file);
  }
}
