import { Controller, Get } from '@nestjs/common';
import { OrderService } from './order.service';
import { MessagePattern } from '@nestjs/microservices';
import { CreateOrderDto } from './dto';

@Controller()
export class OrderController {
  constructor(private readonly orderService: OrderService) { }

  @MessagePattern({ cmd: 'create_orden' })
  create(order: CreateOrderDto) {
    return this.orderService.create(order)
  }

  @MessagePattern({ cmd: 'count_order_today' })
  countOrdersForToday(order: CreateOrderDto) {
    return this.orderService.countOrdersForToday(order.restaurant)
  }

  @MessagePattern({ cmd: 'listado_ordenes' })
  findAll() {
    return this.orderService.findAll()
  }
}
