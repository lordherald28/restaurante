import { Module } from '@nestjs/common';
import { AppController } from './restaurante.controller';
import { AppService } from './restaurante.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { DatabaseModule } from '@app/common';

@Module({
  imports: [
    // ClientsModule.register([
    //   {
    //     name: 'CLIENTE_SERVICE',
    //     transport: Transport.REDIS,
    //     options: {
    //       host: 'localhost',
    //       port: 6379
    //     }
    //   },
    // ]),
    // DatabaseModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
