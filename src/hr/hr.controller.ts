import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param, Inject, forwardRef, Delete, Query,
} from '@nestjs/common';
import { HrService } from './hr.service';
import { CreateHrDto } from './dto/create-hr.dto';
import { UpdateHrDto } from './dto/update-hr.dto';
import { RegisterHrDto } from './dto/register-hr.dto';
import {Serialize} from "../interceptors/serialization.interceptor";
import {ResponseHrDto} from "./dto/response-hr.dto";
import {QueryHrDto} from "./dto/query-hr.dto";


@Serialize(ResponseHrDto)
@Controller('hr')
export class HrController {

  @Inject(forwardRef(()=>HrService))
  private readonly hrService: HrService
  @Post()
  create(@Body() createHrDto: CreateHrDto) {
    return this.hrService.create(createHrDto);
  }
  @Get()
  findAll(
      @Query() hrQuery:QueryHrDto
  ) {
    return this.hrService.findAll(hrQuery);
  }
  @Post('/register/:id')
  registerHr(@Param('id') id: string, @Body() createHrDto: RegisterHrDto) {
    return this.hrService.register(createHrDto,id);
  }
  @Get('/user/:id')
  getHrByUserId(@Param('id') id: string) {
    return this.hrService.findOneByUserId(id);
  }
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.hrService.findOne(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.hrService.remove(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateHrDto: UpdateHrDto) {
    return this.hrService.update(id, updateHrDto);
  }
}
