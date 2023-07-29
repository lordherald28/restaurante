import { Module } from '@nestjs/common';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { MongooseModule } from '@nestjs/mongoose';
import { IOrder,OrderSchema } from './schema/order.schema';
// import { ClienteModule } from 'apps/cliente/src/cliente.module';
// import { RestauranteModule } from 'apps/restaurante/src/restaurante.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://127.0.0.1:27017/order'),
    MongooseModule.forFeature([{
      name: IOrder.name,
      schema: OrderSchema
    }]),
    // ClienteModule,
    // RestauranteModule
  ],
  controllers: [OrderController],
  providers: [OrderService,
    // {
    //   provide: 'IRestauranteModel',
    //   useValue: RestauranteModule,
    // }
  ],
})
export class OrderModule {}
