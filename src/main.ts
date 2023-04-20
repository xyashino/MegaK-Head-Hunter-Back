import { NestFactory } from '@nestjs/core';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';
import { AppModule } from './app.module';
async function bootstrap() {
  const { PORT , CORS} = process.env;
  const app = await NestFactory.create(AppModule);

  const options: CorsOptions = {
    origin: CORS,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    credentials: true,
  };
  app.enableCors(options);
  await app.listen(PORT);
}
bootstrap();
