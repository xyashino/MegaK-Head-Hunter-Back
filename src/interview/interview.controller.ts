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
import { UserObj } from '../common/decorators/user-obj.decorator';
import { User } from '../users/entities/user.entity';
import { AuthGuard } from '@nestjs/passport';
import { SearchAndPageOptionsDto } from '../common/dtos/page/search-and-page-options.dto';
import { Serialize } from '../common/interceptors/serialization.interceptor';
import { ResponseFindInterviewDto } from './dto/resoponse-find-interview.dto';
import { CreateInterviewResponseDto } from './dto/create-interview-response.dto';
import {
  ApiConflictResponse,
  ApiCookieAuth,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { Roles } from '../common/decorators/roles.decorator';
import { UserRole } from '../common/enums/user-role.enums';
import { RolesGuard } from '../common/guards/roles.guard';

@ApiTags('Interview')
@ApiCookieAuth()
@ApiUnauthorizedResponse({
  description: 'Unauthorized',
})
@Controller('interview')
export class InterviewController {
  constructor(private readonly interviewService: InterviewService) {}

  @ApiCreatedResponse({
    description: 'Interview created successfully',
    type: CreateInterviewResponseDto,
  })
  @ApiConflictResponse({
    description:
      'The maximum number of interview bookings has been reached.' +
      'The student was hired. Cannot be added to the interview' +
      'The student is currently on the conversation. Cannot be added to the interview',
  })
  @Roles(UserRole.HR)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Post()
  @Serialize(CreateInterviewResponseDto)
  create(@Body('studentId') studentId: string, @UserObj() user: User) {
    return this.interviewService.createInterview(studentId, user);
  }

  @ApiOkResponse({
    description: 'Successfully retrieved array of interviews and pagination',
    type: ResponseFindInterviewDto,
  })
  @UseGuards(AuthGuard('jwt'))
  @Get()
  @Serialize(ResponseFindInterviewDto)
  findAllInterview(
    @Query() searchOptions: SearchAndPageOptionsDto,
    @UserObj() user: User,
  ) {
    return this.interviewService.findAllInterview(searchOptions, user);
  }

  @ApiOkResponse({
    description: 'Successfully retrieved one interview',
    type: CreateInterviewResponseDto,
  })
  @ApiNotFoundResponse({
    description: 'Invalid interview id',
  })
  @Get(':id')
  @Serialize(CreateInterviewResponseDto)
  findOne(@Param('id') id: string) {
    return this.interviewService.findOne(id);
  }

  @ApiOkResponse({
    description: 'Successfully removed interview',
    type: CreateInterviewResponseDto,
  })
  @ApiNotFoundResponse({
    description: 'Invalid interview id',
  })
  @Roles(UserRole.HR)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Delete(':id')
  @Serialize(CreateInterviewResponseDto)
  remove(@Param('id') studentId: string, @UserObj() user: User) {
    return this.interviewService.removeInterview(studentId, user);
  }
}
