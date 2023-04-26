import { ValidationPipeOptions } from '@nestjs/common';

export const pipesConfig: ValidationPipeOptions = {
  disableErrorMessages: false,
  whitelist: true,
  forbidNonWhitelisted: true,
  transform: true,
  transformOptions: {
    enableImplicitConversion: true,
  },
};
