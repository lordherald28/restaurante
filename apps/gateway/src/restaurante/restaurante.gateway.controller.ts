import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { defineRestauranteDto, updateRestauranteDto } from '../../../restaurante/src/dto';
import { RestauranteGateWayService } from './restaurante.gateway.service';



@Controller('restaurante')
export class RestauranteGateWayController {
  constructor(private readonly appService: RestauranteGateWayService) { }


  @Post('create')
  async create(
    @Body()
    restuarante: defineRestauranteDto
  ) {
    return this.appService.create(restuarante)
  }

  @Get()
  findAll() {
    return this.appService.findAll()
  }

  @Get(':id')
  findOne(
    @Param('id') id: string
  ) {
    return this.appService.findOne(id)
  }

  @Patch(':id')
  update(
    @Param('id')
    id: string,
    @Body()
    cliente: updateRestauranteDto
  ) {
    return this.appService.update(cliente, id)
  }

  @Delete(':id')
  delete(
    @Param('id') id: string
  ) {
    return this.appService.delete(id)
  }

}
