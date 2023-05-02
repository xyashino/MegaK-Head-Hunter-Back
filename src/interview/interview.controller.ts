import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
} from '@nestjs/common';
import { InterviewService } from './interview.service';
import { UserObj } from '../decorators/user-obj.decorator';
import { User } from '../users/entities/user.entity';
import { AuthGuard } from '@nestjs/passport';
import { SearchAndPageOptionsDto } from '../common/dtos/page/search-and-page-options.dto';
import { Serialize } from '../interceptors/serialization.interceptor';
import { ResponseFindInterviewDto } from './dto/resoponse-find-interview.dto';
import { CreateInterviewResponseDto } from './dto/create-interview-response.dto';
import { ResponseInterviewDto } from './dto/response-interview.dto';

@Controller('interview')
export class InterviewController {
  constructor(private readonly interviewService: InterviewService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post()
  @Serialize(CreateInterviewResponseDto)
  create(@Body('studentId') studentId: string, @UserObj() user: User) {
    return this.interviewService.createInterview(studentId, user);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get()
  @Serialize(ResponseFindInterviewDto)
  findInterviewAndStudents(
    @Query() searchOptions: SearchAndPageOptionsDto,
    @UserObj() user: User,
  ) {
    return this.interviewService.findAllInterview(searchOptions, user);
  }

  @Get(':id')
  @Serialize(ResponseInterviewDto)
  findOne(@Param('id') id: string) {
    return this.interviewService.findOne(id);
  }

  @Patch(':id')
  @Serialize(ResponseInterviewDto)
  update(@Param('id') id: string) {
    return this.interviewService.update(id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  @Serialize(ResponseInterviewDto)
  remove(@Param('id') studentId: string, @UserObj() user: User) {
    return this.interviewService.removeInterview(studentId, user);
  }
}
