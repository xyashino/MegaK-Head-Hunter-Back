import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
async function bootstrap() {
  const { PORT } = process.env;
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());
  // const options: CorsOptions = {
  //   origin: CORS,
  //   methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  //   preflightContinue: false,
  //   credentials: true,
  // };
  // app.enableCors(options);
  app.enableCors({
    credentials: true,
    origin: ['http://localhost:3000', 'http://127.0.0.1:5173'],
  });
  await app.listen(PORT);
}
bootstrap();
