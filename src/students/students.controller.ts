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
} from '@nestjs/common';
import { StudentsService } from './students.service';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { RegisterStudentDto } from './dto/register-student.dto';
import { Serialize } from '../interceptors/serialization.interceptor';
import { SearchAndPageOptionsDto } from '../common/dtos/page/search-and-page-options.dto';
import { ResponseAvailableStudentsDto } from './dto/response-available-students.dto';
import { AuthGuard } from '@nestjs/passport';
import { UserObj } from '../decorators/user-obj.decorator';
import { User } from '../users/entities/user.entity';

@Controller('students')
export class StudentsController {
  @Inject(forwardRef(() => StudentsService))
  private readonly studentsService: StudentsService;

  @Post()
  @Serialize(RegisterStudentDto)
  create(@Body() CreateStudentDto: CreateStudentDto) {
    return this.studentsService.create(CreateStudentDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get()
  @Serialize(ResponseAvailableStudentsDto)
  findAll(
    @Query() searchOptions: SearchAndPageOptionsDto,
    @UserObj() user: User,
  ) {
    return this.studentsService.findAll(searchOptions, user);
  }

  @Post('/register/:id')
  @Serialize(RegisterStudentDto)
  register(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() registerStudentDto: RegisterStudentDto,
  ) {
    return this.studentsService.register(id, registerStudentDto);
  }

  @Get(':id')
  @Serialize(RegisterStudentDto)
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.studentsService.findOne(id);
  }

  @Delete(':id')
  @Serialize(RegisterStudentDto)
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.studentsService.remove(id);
  }

  @Patch(':id')
  @Serialize(RegisterStudentDto)
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateStudentDto: UpdateStudentDto,
  ) {
    return this.studentsService.update(id, updateStudentDto);
  }
}
