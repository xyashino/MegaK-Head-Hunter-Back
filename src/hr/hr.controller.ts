import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Inject,
  forwardRef,
  Delete,
  Res,
  UseGuards,
} from '@nestjs/common';
import { HrService } from './hr.service';
import { CreateHrDto } from './dto/create-hr.dto';
import { UpdateHrDto } from './dto/update-hr.dto';
import { RegisterHrDto } from './dto/register-hr.dto';
import { Serialize } from '../common/interceptors/serialization.interceptor';
import { ResponseHrDto } from './dto/response-hr.dto';
import { Response } from 'express';
import {
  ApiBody,
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
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../common/guards/roles.guard';

@ApiTags('Hr')
@ApiCookieAuth()
@ApiUnauthorizedResponse({
  description: 'Unauthorized',
})
@Serialize(ResponseHrDto)
@Controller('hr')
export class HrController {
  @Inject(forwardRef(() => HrService))
  private readonly hrService: HrService;

  @ApiCreatedResponse({
    description: 'HR user created successfully',
    type: ResponseHrDto,
  })
  @ApiConflictResponse({
    description: 'Email is already taken',
  })
  @Roles(UserRole.ADMIN)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Post()
  create(@Body() createHrDto: CreateHrDto) {
    return this.hrService.create(createHrDto);
  }

  @ApiOkResponse({
    description: 'Successfully retrieved array of HR users',
    type: [ResponseHrDto],
  })
  @UseGuards(AuthGuard('jwt'))
  @Get()
  findAll() {
    return this.hrService.findAll();
  }

  @ApiCreatedResponse({
    description: 'User registration successful. The user is logged in.',
  })
  @ApiConflictResponse({
    description: 'User already registered',
  })
  @ApiBody({
    type: RegisterHrDto,
  })
  @Post('/register/:id')
  registerHr(
    @Param('id') id: string,
    @Body() createHrDto: RegisterHrDto,
    @Res() res: Response,
  ) {
    return this.hrService.register(createHrDto, id, res);
  }

  @ApiOkResponse({
    description: 'Successfully retrieved HR user',
    type: ResponseHrDto,
  })
  @ApiNotFoundResponse({
    description: 'Invalid hr id',
  })
  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.hrService.findOne(id);
  }

  @ApiOkResponse({
    description: 'Successfully removed HR user',
    type: ResponseHrDto,
  })
  @ApiNotFoundResponse({
    description: 'Invalid hr id',
  })
  @Roles(UserRole.ADMIN, UserRole.HR)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.hrService.remove(id);
  }

  @ApiOkResponse({
    description: 'Successfully updated HR user',
    type: ResponseHrDto,
  })
  @ApiBody({ type: UpdateHrDto })
  @Roles(UserRole.ADMIN, UserRole.HR)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateHrDto: UpdateHrDto) {
    return this.hrService.update(id, updateHrDto);
  }
}
