import { DocumentBuilder } from '@nestjs/swagger';

export const swaggerConfig = new DocumentBuilder()
  .setTitle('Head Hunter MegaK')
  .setDescription('The Head Hunter MegaK API description')
  .setVersion('1.0')
  .build();
