import {
  Controller,
  Get,
  Inject,
  Query,
  Req,
  forwardRef,
} from '@nestjs/common';

import { FiltrationService } from './filtration.service';
import { FilterStudentDto } from './dto/filter-student.dto';

@Controller('filtration')
export class FiltrationController {
  @Inject(forwardRef(() => FiltrationService))
  private readonly filtrationService: FiltrationService;

  @Get()
  filterStudentPreferences(
    @Query() filterStudentDto: FilterStudentDto,
  ): Promise<any> {
    return this.filtrationService.filterStudentPreferences(filterStudentDto);
  }
}
