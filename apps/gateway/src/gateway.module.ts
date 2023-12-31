import { Module } from '@nestjs/common';

import { ClientsModule, Transport } from '@nestjs/microservices';
import { ClientGateWayController } from './client/client.gateway.controller';
import { ClientGateWayService } from './client/client.gateway.service';
import { RestauranteGateWayController } from './restaurante/restaurante.gateway.controller';
import { RestauranteGateWayService } from './restaurante/restaurante.gateway.service';
import { OrderGateWayController } from './order/order.gateway.controller';
import { OrderGateWayService } from './order/order.gateway.service';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'CLIENTE_SERVICE',
        transport: Transport.REDIS,
        options: {
          host: 'localhost',
          port: 6379,

        }
      },
      {
        name: 'RESTAURANTE_SERVICE',
        transport: Transport.REDIS,
        options: {
          host: 'localhost',
          port: 6379
        }
      },
      {
        name: 'ORDER_SERVICE',
        transport: Transport.REDIS,
        options: {
          host: 'localhost',
          port: 6379
        }
      },
    ]),
  ],
  controllers: [ClientGateWayController, RestauranteGateWayController, OrderGateWayController],
  providers: [ClientGateWayService, RestauranteGateWayService, OrderGateWayService],
})
export class GatewayModule { }
