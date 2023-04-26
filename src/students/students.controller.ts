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
} from '@nestjs/common';
import { StudentsService } from './students.service';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { PageOptionsDto } from '../common/dtos/page/page-options.dto';

@Controller('students')
export class StudentsController {
  @Inject(forwardRef(() => StudentsService))
  private readonly studentsService: StudentsService;

  @Post()
  create(@Body() CreateStudentDto: CreateStudentDto) {
    return this.studentsService.create(CreateStudentDto);
  }
  @Get()
  findAll(@Query() pageOptions: PageOptionsDto) {
    return this.studentsService.findAll(pageOptions);
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.studentsService.findOne(id);
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.studentsService.remove(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateStudentDto: UpdateStudentDto,
  ) {
    return this.studentsService.update(id, updateStudentDto);
  }
}
