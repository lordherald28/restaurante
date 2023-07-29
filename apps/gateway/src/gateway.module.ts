import { Module } from '@nestjs/common';

import { ClientsModule, Transport } from '@nestjs/microservices';
import { ClientGateWayController } from './client/client.gateway.controller';
import { ClientGateWayService } from './client/client.gateway.service';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'CLIENTE_SERVICE',
        transport: Transport.REDIS,
        options: {
          host: 'localhost',
          port: 6379
        }
      },
    ]),
  ],
  controllers: [ClientGateWayController],
  providers: [ClientGateWayService],
})
export class GatewayModule { }
