import { Body, Controller, Param } from '@nestjs/common';
import { RestauranteService } from './restaurante.service';
import { defineRestauranteDto } from './dto/restaurante.dto';
import { updateRestauranteDto } from './dto/restaurante.update.dto';
import { MessagePattern } from '@nestjs/microservices';


@Controller()
export class RestauranteController {
  constructor(private readonly appService: RestauranteService) { }


  @MessagePattern({ cmd: 'create' })
  async create(
    // @Body()
    restuarante: defineRestauranteDto
  ) {
    return this.appService.create(restuarante)
  }

  @MessagePattern({ cmd: 'listado' })
  findAll() {
    return this.appService.findAll()
  }

  @MessagePattern({ cmd: 'get_one' })
  findOne(
    id: string
  ) {
    return this.appService.findOne(id)
  }

  @MessagePattern({ cmd: 'update' })
  update(
    @Param('id')
    id: string,
    @Body()
    cliente: updateRestauranteDto
  ) {
    return this.appService.update(cliente)
  }

  @MessagePattern({ cmd: 'delete' })
  delete(
    id: string
  ) {
    return this.appService.delete(id)
  }

}
