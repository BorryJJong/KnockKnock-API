import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import {swaggerBuilder} from './config/swagger';
import 'dotenv/config';
import {ValidationPipe} from '@nestjs/common';
import {HttpExceptionFilter} from '@shared/filter/HttpException.Filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  swaggerBuilder(app);

  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(process.env.APP_PORT, () => {
    console.log(`[ 녹녹 ] Server listening on port : ${process.env.APP_PORT}`);
  });
}

bootstrap();
