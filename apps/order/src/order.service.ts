import { Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IOrder } from './schema/order.schema';
import { CreateOrderDto } from './dto';
import { ICliente } from 'apps/cliente/src/schemas/cliente.schemas';
import { IRestaurante, IRestauranteDocument } from 'apps/restaurante/src/schema/restaurante.schemas';

@Injectable()
export class OrderService {

  constructor(
    @InjectModel(IOrder.name) private orderModel: Model<IOrder>,
    // @InjectModel(ICliente.name) private clientModel: Model<ICliente>,
    // @InjectModel(IRestaurante.name) private restauranteModel: Model<IRestaurante>
    // @Inject('IRestauranteModel') private restauranteModel: Model<IRestauranteDocument>,

  ) {

  }

  async create(order: CreateOrderDto): Promise<IOrder | { error: string }> {
    try {
      // const cliente = await this.clientModel.findOne({ _id: order.client }).exec();
      // if (!cliente || cliente.age < 18) {
      //   return { error: 'Solo se permiten adultos' };
      // }

      // const restaurante = await this.restauranteModel.findOne({ _id: order.restaurant }).exec();
      // if (!restaurante) {
      //   return { error: 'Restaurante no encontrado' };
      // }

      const orders = await this.orderModel.find({ restaurant: order.restaurant, date: order.date }).exec();
      const totalClientes = orders.length;

      // if (totalClientes >= restaurante.capacity) {
      //   return { error: 'Capacidad máxima alcanzada para este día' };
      // }

      return await (new this.orderModel(order).save({ validateBeforeSave: true }));
    } catch (error) {
      // console.error(error);
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
