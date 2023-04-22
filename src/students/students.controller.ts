import {
  Body,
  Controller,
  forwardRef,
  Inject,
  Post,
  Get,
} from '@nestjs/common';
import { StudentsService } from './students.service';
import { CreateStudentDto } from './dto/create-student.dto';

@Controller('students')
export class StudentsController {
  @Inject(forwardRef(() => StudentsService))
  private readonly StudentsService: StudentsService;

  @Post()
  create(@Body() CreateStudentDto: CreateStudentDto) {
    return this.StudentsService.create(CreateStudentDto);
  }
  @Get()
  findAll() {
    return this.StudentsService.findAll();
  }
}
