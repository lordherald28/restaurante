import { Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IOrder } from './schema/order.schema';
import { CreateOrderDto } from './dto';


@Injectable()
export class OrderService {

  constructor(
    @InjectModel(IOrder.name) private orderModel: Model<IOrder>,

  ) {

  }

  async create(order: CreateOrderDto): Promise<IOrder | { error: string }> {
    try {

      const orders = await this.orderModel.find({ restaurant: order.restaurant, date: order.date }).exec();
      return await (new this.orderModel(order).save({ validateBeforeSave: true }));

    } catch (error) {
      return { error: error.message };
    }
  }

  async countOrdersForToday(restaurantId: string): Promise<number> {
    const startOfToday = new Date();
    startOfToday.setHours(0, 0, 0, 0);

    const endOfToday = new Date();
    endOfToday.setHours(23, 59, 59, 999);

    return await this.orderModel.countDocuments({
      restaurant: restaurantId,
      date: {
        $gte: startOfToday,
        $lte: endOfToday
      }
    });
  }

  async findAll(): Promise<IOrder[]> {
    return await this.orderModel.find().exec();
  }


}
