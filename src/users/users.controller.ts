import {
  Body,
  Controller,
  Get,
  Post,
  Body,
  Param,
  forwardRef,
  Inject,
  ParseUUIDPipe,
  Delete,
  Patch,
  UseGuards,
} from '@nestjs/common';
import {UsersService} from './users.service';
import {CreateUserDto} from './dto/create-user.dto';
import {UpdateUserDto} from './dto/update-user.dto';
import {Serialize} from "../interceptors/serialization.interceptor";
import {ResponseUserDto} from "./dto/response-user.dto";
import {AuthGuard} from "@nestjs/passport";
import {UserObj} from "../decorators/user-obj.decorator";
import {User} from "./entities/user.entity";


@Controller('users')
@Serialize(ResponseUserDto)
export class UsersController {
  @Inject(forwardRef(() => UsersService))
  private readonly usersService: UsersService;

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('current')
  getCurrentUser(
      @UserObj() user: User
  ) {
    return this.usersService.findOne(user.id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.usersService.update(id, updateUserDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.usersService.remove(id);
  }
}
