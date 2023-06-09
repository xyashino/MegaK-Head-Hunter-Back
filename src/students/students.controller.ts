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
import {StudentsService} from './students.service';
import {CreateStudentDto} from './dto/create-student.dto';
import {UpdateStudentDto} from './dto/update-student.dto';
import {RegisterStudentDto} from './dto/register-student.dto';
import {Serialize} from '@interceptors/serialization.interceptor';
import {ResponseFindAllStudentsDto} from './dto/response-find-all-students.dto';
import {AuthGuard} from '@nestjs/passport';
import {UserObj} from '@decorators/user-obj.decorator';
import {User} from '@users/entities/user.entity';
import {ResponseStudentDto} from './dto/response-student.dto';
import {Response} from 'express';
import {Roles} from '@decorators/roles.decorator';
import {UserRole} from '@enums/user-role.enums';
import {RolesGuard} from "@guards/roles.guard";
import {SearchOptionsDto} from "@dtos/page/search-options.dto";

@Controller('students')
export class StudentsController {
  @Inject(forwardRef(() => StudentsService))
  private readonly studentsService: StudentsService;

  @Post()
  @Serialize(ResponseStudentDto)
  @Roles(UserRole.ADMIN)
  @UseGuards(AuthGuard('jwt'),RolesGuard)
  create(@Body() createStudentDto: CreateStudentDto) {
    return this.studentsService.create(createStudentDto);
  }
  @Get()
  @Roles(UserRole.ADMIN,UserRole.HR)
  @UseGuards(AuthGuard('jwt'),RolesGuard)
  @Serialize(ResponseFindAllStudentsDto)
  findAll(@Query() searchOptions: SearchOptionsDto, @UserObj() user: User) {
    return this.studentsService.findAll(searchOptions, user);
  }

  @Post('register/:id')
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
  @Roles(UserRole.ADMIN, UserRole.STUDENT)
  @UseGuards(AuthGuard('jwt'),RolesGuard)
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.studentsService.remove(id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard('jwt'))
  @Serialize(ResponseStudentDto)
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateStudentDto: UpdateStudentDto,
  ) {
    return this.studentsService.update(id, updateStudentDto);
  }
}
