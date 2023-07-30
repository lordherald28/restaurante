import { Module } from '@nestjs/common';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { MongooseModule } from '@nestjs/mongoose';
import { IOrder, OrderSchema } from './schema/order.schema';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://127.0.0.1:27017/order'),
    MongooseModule.forFeature([{
      name: IOrder.name,
      schema: OrderSchema
    }]),
  ],
  controllers: [OrderController],
  providers: [OrderService,
  ],
})
export class OrderModule { }
