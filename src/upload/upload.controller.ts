import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { UploadService } from './upload.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { fileFilter, fileLimits } from '../utils/file-filters';
import { MulterMemoryUploadedFile } from '../common/interfaces/files';

@Controller('upload')
export class UploadController {
  constructor(private readonly adminService: UploadService) {}

  @Post('/file')
  @UseInterceptors(
    FileInterceptor('uploadStudents', {
      limits: fileLimits,
      fileFilter: fileFilter,
    }),
  )
  uploadStudents(@UploadedFile() file: MulterMemoryUploadedFile) {
    return this.adminService.uploadStudents(file);
  }
}
