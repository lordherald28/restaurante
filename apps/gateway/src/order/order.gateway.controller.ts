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
    // this.appService.create(order).subscribe(console.log)
  //  return this.appService.create(order).subscribe(response => {
  //     console.log(response)
  //     if (response instanceof HttpException) {
  //       return response
  //     }
  //   })
  return this.appService.create(order)
  }

  @Get('list')
  findAll() {
    return this.appService.findAll()
  }

  @Get(':id')
  findOne(
    @Param('id') id: string
  ) {
    return this.appService.findOne(id)
  }


}
