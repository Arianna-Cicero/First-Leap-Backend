import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  console.log('DB_HOST:', configService.get('DB_HOST'));
  console.log('DB_PORT:', configService.get('DB_PORT'));
  console.log('DB_DATABASE:', configService.get('DB_DATABASE'));
  await app.listen(3000);
}
bootstrap();
