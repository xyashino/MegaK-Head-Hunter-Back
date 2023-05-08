import {
  Body,
  Controller,
  Delete,
  forwardRef,
  Get,
  Inject,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
  Res,
  UseGuards,
} from '@nestjs/common';
import { StudentsService } from './students.service';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { RegisterStudentDto } from './dto/register-student.dto';
import { Serialize } from '../common/interceptors/serialization.interceptor';
import { SearchAndPageOptionsDto } from '../common/dtos/page/search-and-page-options.dto';
import { ResponseFindAllStudentsDto } from './dto/response-find-all-students.dto';
import { AuthGuard } from '@nestjs/passport';
import { UserObj } from '../common/decorators/user-obj.decorator';
import { User } from '../users/entities/user.entity';
import { ResponseStudentDto } from './dto/response-student.dto';
import { Response } from 'express';
import {
  ApiBody,
  ApiConflictResponse,
  ApiCookieAuth,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { UserRole } from '../common/enums/user-role.enums';

@ApiTags('Students')
@ApiCookieAuth()
@ApiUnauthorizedResponse({
  description: 'Unauthorized',
})
@Controller('students')
export class StudentsController {
  @Inject(forwardRef(() => StudentsService))
  private readonly studentsService: StudentsService;

  @ApiCreatedResponse({
    description: 'Student user created successfully',
    type: ResponseStudentDto,
  })
  @ApiConflictResponse({
    description: 'Email is already taken',
  })
  @Roles(UserRole.ADMIN)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Post()
  @Serialize(ResponseStudentDto)
  create(@Body() CreateStudentDto: CreateStudentDto) {
    return this.studentsService.create(CreateStudentDto);
  }

  @ApiOkResponse({
    description: 'Successfully retrieved array of Student users and pagination',
    type: ResponseFindAllStudentsDto,
  })
  @Roles(UserRole.ADMIN, UserRole.HR)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Get()
  @Serialize(ResponseFindAllStudentsDto)
  findAll(
    @Query() searchOptions: SearchAndPageOptionsDto,
    @UserObj() user: User,
  ) {
    return this.studentsService.findAll(searchOptions, user);
  }

  @ApiCreatedResponse({
    description: 'User registration successful. The user is logged in.',
  })
  @ApiConflictResponse({
    description: 'User already registered',
  })
  @ApiBody({
    type: RegisterStudentDto,
  })
  @Post('/register/:id')
  @Serialize(ResponseStudentDto)
  register(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() registerStudentDto: RegisterStudentDto,
    @Res() res: Response,
  ) {
    return this.studentsService.register(id, registerStudentDto, res);
  }

  @ApiOkResponse({
    description: 'Successfully retrieved Student user',
    type: ResponseStudentDto,
  })
  @ApiNotFoundResponse({
    description: 'Invalid student id',
  })
  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  @Serialize(ResponseStudentDto)
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.studentsService.findOne(id);
  }

  @ApiOkResponse({
    description: 'Successfully removed Student user',
    type: ResponseStudentDto,
  })
  @ApiNotFoundResponse({
    description: 'Invalid student id',
  })
  @Roles(UserRole.ADMIN, UserRole.HR)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Delete(':id')
  @Serialize(ResponseStudentDto)
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.studentsService.remove(id);
  }

  @ApiOkResponse({
    description: 'Successfully updated student user',
    type: ResponseStudentDto,
  })
  @ApiBody({
    type: UpdateStudentDto,
  })
  @Roles(UserRole.ADMIN, UserRole.STUDENT)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Patch(':id')
  @Serialize(ResponseStudentDto)
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateStudentDto: UpdateStudentDto,
  ) {
    return this.studentsService.update(id, updateStudentDto);
  }
}
