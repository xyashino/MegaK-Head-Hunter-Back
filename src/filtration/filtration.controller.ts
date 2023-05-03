import { Controller, Get, Inject, Req, forwardRef } from '@nestjs/common';

import { FiltrationService } from './filtration.service';
import { Request } from 'express';

@Controller('filtration')
export class FiltrationController {
  @Inject(forwardRef(() => FiltrationService))
  private readonly filtrationService: FiltrationService;

  @Get()
  findMark(@Req() req: Request): Promise<any> {
    return this.filtrationService.findMark(req.query);
  }
}
