import { NestFactory } from '@nestjs/core';
import { AppModule } from '@app.module';
import { ValidationPipe } from '@nestjs/common';
import { corsConfig } from '@config/cors.config';
import { pipesConfig } from '@config/pipes.config';
import * as cookieParser from 'cookie-parser';
async function bootstrap() {
  const { PORT } = process.env;
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe(pipesConfig));
  app.enableCors(corsConfig);
  app.use(cookieParser());
  await app.listen(PORT);
}
bootstrap();
