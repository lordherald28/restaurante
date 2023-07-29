import { NestFactory } from '@nestjs/core';
import { AppModule } from './restaurante.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      skipNullProperties: false,
    })
  )
  await app.listen(3001, () => { console.log('Inicializada la Aplicacion Principal, por el puerto: 3001') });
}
bootstrap();
