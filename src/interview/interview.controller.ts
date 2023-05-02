import {
  Controller,
  Get,
  Post,
  Body,
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
  @Serialize(CreateInterviewResponseDto)
  findOne(@Param('id') id: string) {
    return this.interviewService.findOne(id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  @Serialize(CreateInterviewResponseDto)
  remove(@Param('id') studentId: string, @UserObj() user: User) {
    return this.interviewService.removeInterview(studentId, user);
  }
}
