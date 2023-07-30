import { Body, Controller, Get, HttpException, Param, Post } from '@nestjs/common';
import { OrderGateWayService } from './order.gateway.service';
import { CreateOrderDto } from 'apps/order/src/dto';
import { response } from 'express';

@Controller('order')
export class OrderGateWayController {
  constructor(private readonly appService: OrderGateWayService) { }


  @Post('create')
  async crate(
    @Body()
    order: CreateOrderDto
  ) {
  return this.appService.create(order)
  }

  @Get('list')
  findAll() {
    return this.appService.findAll()
  }




}
