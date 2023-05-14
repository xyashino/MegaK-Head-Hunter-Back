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
import { AuthGuard } from '@nestjs/passport';
import { SearchOptionsDto } from '@dtos/page/search-options.dto';
import { ResponseFindInterviewDto } from './dto/resoponse-find-interview.dto';
import { CreateInterviewResponseDto } from './dto/create-interview-response.dto';
import { Serialize } from '@interceptors/serialization.interceptor';
import { User } from '@users/entities/user.entity';
import { UserObj } from '@decorators/user-obj.decorator';

@Controller('interview')
export class InterviewController {
  constructor(private readonly interviewService: InterviewService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  @Serialize(CreateInterviewResponseDto)
  create(@Body('studentId') studentId: string, @UserObj() user: User) {
    return this.interviewService.createInterview(studentId, user);
  }

  @Get()
  @UseGuards(AuthGuard('jwt'))
  @Serialize(ResponseFindInterviewDto)
  findAllInterview(
    @Query() searchOptions: SearchOptionsDto,
    @UserObj() user: User,
  ) {
    return this.interviewService.findAllInterview(searchOptions, user);
  }

  @Get(':id')
  @UseGuards(AuthGuard('jwt'))
  @Serialize(CreateInterviewResponseDto)
  findOne(@Param('id') id: string) {
    return this.interviewService.findOne(id);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  @Serialize(CreateInterviewResponseDto)
  remove(@Param('id') studentId: string, @UserObj() user: User) {
    return this.interviewService.removeInterview(studentId, user);
  }
}
