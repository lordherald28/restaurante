import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { RestauranteGateWayService } from './restaurante.gateway.service';
import { createClientDto } from 'apps/cliente/src/dto/cliente.dto';
import { updateClienteDto } from 'apps/cliente/src/dto/cliente.update.dto';

@Controller('app')
export class RestauranteGateWayController {
  constructor(private readonly appService: RestauranteGateWayService) { }


  @Post('restaurante/create')
  async definirRestaurante(
    @Body()
    cliente: createClientDto
  ) {
    return this.appService.definirRestaurante(cliente)
  }

  @Get('restaurante/list')
  findAll() {
    return this.appService.findAll()
  }

  @Get('restaurante/:id')
  findOneCliente(
    @Param('id') id: string
  ) {
    return this.appService.findOne(id)
  }

  @Patch('restaurante/:id')
  updateCliente(
    @Param('id')
    id: string,
    @Body()
    cliente: updateClienteDto
  ) {
    return this.appService.updateCliente(cliente, id)
  }

  @Delete('restaurante/:id')
  deleteCliente(
    @Param('id') id: string
  ) {
    return this.appService.delete(id)
  }

}
