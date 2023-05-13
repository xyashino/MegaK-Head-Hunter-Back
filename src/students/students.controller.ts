import {
  Body,
  Controller,
  forwardRef,
  Inject,
  Post,
  Get,
  Param,
  Delete,
  Patch,
  ParseUUIDPipe,
  Query,
  UseGuards,
  Res,
} from '@nestjs/common';
import { StudentsService } from './students.service';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { RegisterStudentDto } from './dto/register-student.dto';
import { Serialize } from '@interceptors/serialization.interceptor';
import { SearchAndPageOptionsDto } from '@dtos/page/search-and-page-options.dto';
import { ResponseFindAllStudentsDto } from './dto/response-find-all-students.dto';
import { AuthGuard } from '@nestjs/passport';
import { UserObj } from '@decorators/user-obj.decorator';
import { User } from '@users/entities/user.entity';
import { ResponseStudentDto } from './dto/response-student.dto';
import { Response } from 'express';

@Controller('students')
export class StudentsController {
  @Inject(forwardRef(() => StudentsService))
  private readonly studentsService: StudentsService;

  @Post()
  @Serialize(ResponseStudentDto)
  create(@Body() createStudentDto: CreateStudentDto) {
    return this.studentsService.create(createStudentDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get()
  @Serialize(ResponseFindAllStudentsDto)
  findAll(
    @Query() searchOptions: SearchAndPageOptionsDto,
    @UserObj() user: User,
  ) {
    return this.studentsService.findAll(searchOptions, user);
  }

  @Post('/register/:id')
  @Serialize(ResponseStudentDto)
  register(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() registerStudentDto: RegisterStudentDto,
    @Res() res: Response,
  ) {
    return this.studentsService.register(id, registerStudentDto, res);
  }

  @Get(':id')
  @Serialize(ResponseStudentDto)
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.studentsService.findOne(id);
  }

  @Delete(':id')
  @Serialize(ResponseStudentDto)
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.studentsService.remove(id);
  }

  @Patch(':id')
  @Serialize(ResponseStudentDto)
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateStudentDto: UpdateStudentDto,
  ) {
    return this.studentsService.update(id, updateStudentDto);
  }
}
