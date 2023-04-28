import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { InterviewService } from './interview.service';
import { UserObj } from '../decorators/user-obj.decorator';
import { User } from '../users/entities/user.entity';
import { AuthGuard } from '@nestjs/passport';

@Controller('interview')
export class InterviewController {
  constructor(private readonly interviewService: InterviewService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post()
  create(@Body('studentId') studentId: string, @UserObj() user: User) {
    return this.interviewService.createInterview(studentId, user);
  }

  @Get()
  findAll() {
    return this.interviewService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.interviewService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateInterviewDto) {
    return this.interviewService.update(+id, updateInterviewDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete()
  remove(@Body('studentId') studentId: string, @UserObj() user: User) {
    return this.interviewService.removeInterview(studentId, user);
  }
}
