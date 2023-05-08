import { Module } from '@nestjs/common';
import { FiltrationService } from './filtration.service';

@Module({
  providers: [FiltrationService],
  exports: [FiltrationService],
})
export class FiltrationModule {}
