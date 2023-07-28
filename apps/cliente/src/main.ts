import { NestFactory } from '@nestjs/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
// import { ClienteModule } from './cliente.module';
// import { AppModule } from 'apps/restaurante/src/app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { ClienteModule } from './cliente.module';

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
      transport: Transport.TCP,
    },
  );
  await app.listen();
}
bootstrap();