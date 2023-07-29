import { NestFactory } from '@nestjs/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
// import { ClienteModule } from './cliente.module';
// import { AppModule } from 'apps/restaurante/src/app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { ClienteModule } from './cliente.module';
import { ValidationPipe } from '@nestjs/common';

/**
 * Esto es el servicio o App o MicroServicio de Clientes
 */
// async function bootstrap() {
//   const app = await NestFactory.create(ClienteModule);
//   await app.listen(3000);
// }
// bootstrap();

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    ClienteModule,
    {
      transport: Transport.REDIS,
      options: {
        host: 'localhost',
        port: 6379
      }
    },
  );
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      skipNullProperties: false,
    })
  )
  await app.listen();
  // await app.sta
}
bootstrap();

// async function bootstrap() {
//   const app = await NestFactory.create(ClienteModule);
//   app.connectMicroservice({
//     transport: Transport.REDIS,
//     options: {
//       host: 'localhost',
//       port: 6379
//     }
//   });
//   app.startAllMicroservices();
// }
// bootstrap();
