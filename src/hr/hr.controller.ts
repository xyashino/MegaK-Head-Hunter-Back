import {Body, Controller, Delete, forwardRef, Get, Inject, Param, Patch, Post, Res, UseGuards,} from '@nestjs/common';
import {HrService} from './hr.service';
import {CreateHrDto} from './dto/create-hr.dto';
import {UpdateHrDto} from './dto/update-hr.dto';
import {RegisterHrDto} from './dto/register-hr.dto';
import {Serialize} from '@interceptors/serialization.interceptor';
import {ResponseHrDto} from './dto/response-hr.dto';
import {Response} from 'express';
import {Roles} from '@decorators/roles.decorator';
import {UserRole} from '@enums/user-role.enums';
import {AuthGuard} from '@nestjs/passport';
import {RolesGuard} from '@guards/roles.guard';

@Serialize(ResponseHrDto)
@Controller('hr')
export class HrController {
  @Inject(forwardRef(() => HrService))
  private readonly hrService: HrService;
  @Post()
  @Roles(UserRole.ADMIN)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  create(@Body() createHrDto: CreateHrDto) {
    return this.hrService.create(createHrDto);
  }
  @Get()
  @Roles(UserRole.ADMIN)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  findAll() {
    return this.hrService.findAll();
  }
  @Post('/register/:id')
  registerHr(
    @Param('id') id: string,
    @Body() createHrDto: RegisterHrDto,
    @Res() res: Response,
  ) {
    return this.hrService.register(createHrDto, id, res);
  }
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.hrService.findOne(id);
  }

  @Delete(':id')
  @Roles(UserRole.ADMIN,UserRole.HR)
  @UseGuards(AuthGuard('jwt'),RolesGuard)
  remove(@Param('id') id: string) {
    return this.hrService.remove(id);
  }

  @Patch(':id')
  @Roles(UserRole.ADMIN,UserRole.HR)
  @UseGuards(AuthGuard('jwt'),RolesGuard)
  update(@Param('id') id: string, @Body() updateHrDto: UpdateHrDto) {
    return this.hrService.update(id, updateHrDto);
  }
}
