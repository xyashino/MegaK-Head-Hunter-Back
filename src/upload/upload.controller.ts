import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  UseGuards,
} from '@nestjs/common';
import { UploadService } from './upload.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { fileFilter, fileLimits } from '../utils/file-filters';
import { MulterMemoryUploadedFile } from '../common/interfaces/files';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiConsumes,
  ApiCookieAuth,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { Roles } from '../common/decorators/roles.decorator';
import { UserRole } from '../common/enums/user-role.enums';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../common/guards/roles.guard';

@ApiTags('Upload')
@ApiCookieAuth()
@ApiUnauthorizedResponse({
  description: 'Unauthorized',
})
@Controller('upload')
export class UploadController {
  constructor(private readonly adminService: UploadService) {}

  @ApiCreatedResponse({
    description: 'New users added successfully',
  })
  @ApiNotFoundResponse({
    description: 'Not found file',
  })
  @ApiBadRequestResponse({
    description: 'CSV parsing errors',
  })
  @ApiBadRequestResponse({
    description: 'Validation failed',
  })
  @Roles(UserRole.ADMIN)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Post('/file')
  @UseInterceptors(
    FileInterceptor('uploadStudents', {
      limits: fileLimits,
      fileFilter: fileFilter,
    }),
  )
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  uploadStudents(@UploadedFile() file: MulterMemoryUploadedFile) {
    return this.adminService.uploadStudents(file);
  }
}
