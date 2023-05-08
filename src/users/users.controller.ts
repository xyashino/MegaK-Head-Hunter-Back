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
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Serialize } from '../common/interceptors/serialization.interceptor';
import { ResponseUserDto } from './dto/response-user.dto';
import { AuthGuard } from '@nestjs/passport';
import { UserObj } from '../common/decorators/user-obj.decorator';
import { User } from './entities/user.entity';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { UserRole } from '../common/enums/user-role.enums';
import {
  ApiBody,
  ApiCookieAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

@ApiTags('Users')
@ApiCookieAuth()
@ApiUnauthorizedResponse({
  description: 'Unauthorized',
})
@Controller('users')
@Serialize(ResponseUserDto)
export class UsersController {
  @Inject(forwardRef(() => UsersService))
  private readonly usersService: UsersService;

  @ApiCreatedResponse({
    description: 'User created successfully',
    type: ResponseUserDto,
  })
  @ApiBody({ type: CreateUserDto })
  @Roles(UserRole.ADMIN)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @ApiOkResponse({
    description: 'Successfully retrieved array of users',
    type: [ResponseUserDto],
  })
  @Get()
  @Roles(UserRole.HR, UserRole.ADMIN)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  findAll() {
    return this.usersService.findAll();
  }

  @ApiOkResponse({
    description: 'Successfully retrieved current user',
    type: ResponseUserDto,
  })
  @UseGuards(AuthGuard('jwt'))
  @Get('current')
  getCurrentUser(@UserObj() user: User) {
    return this.usersService.findOne(user.id);
  }

  @ApiOkResponse({
    description: 'Successfully retrieved user by ID',
    type: ResponseUserDto,
  })
  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @ApiOkResponse({
    description: 'Successfully updated user by ID',
    type: ResponseUserDto,
  })
  @ApiBody({ type: UpdateUserDto })
  @Roles(UserRole.ADMIN)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Patch(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.usersService.update(id, updateUserDto);
  }

  @ApiOkResponse({
    description: 'Successfully removed user',
    type: ResponseUserDto,
  })
  @Roles(UserRole.ADMIN)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.usersService.remove(id);
  }
}
