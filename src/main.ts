import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { swaggerBuilder } from './config/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  swaggerBuilder(app);
  await app.listen(process.env.APP_PORT, () => {
    console.log(`[ 녹녹 ] Server listening on port : ${process.env.APP_PORT}`);
  });
}

bootstrap();
