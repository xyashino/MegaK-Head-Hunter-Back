import { Module } from '@nestjs/common';
import { FiltrationService } from './filtration.service';
import { FiltrationController } from './filtration.controller';

@Module({
  providers: [FiltrationService],
  controllers: [FiltrationController]
})
export class FiltrationModule {}
