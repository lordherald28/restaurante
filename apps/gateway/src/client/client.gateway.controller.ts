import { Body, Controller, Delete, Get, Param,  Patch, Post } from '@nestjs/common';
import { ClientGateWayService } from './client.gateway.service';
import { createClientDto } from 'apps/cliente/src/dto/cliente.dto';
import { updateClienteDto } from 'apps/cliente/src/dto/cliente.update.dto';

@Controller('app')
export class ClientGateWayController {
  constructor(private readonly appService: ClientGateWayService) { }


  @Post('client/create')
  async nuevoCliente(
    @Body()
    cliente: createClientDto
  ) {
    return this.appService.emitirNuevCliente(cliente)
  }

  @Get('client/list')
  findAll() {
    return this.appService.findAll()
  }

  @Get('client/:id')
  findOneCliente(
    @Param('id') id: string
  ) {
    return this.appService.findOne(id)
  }

  @Patch('client/:id')
  updateCliente(
    @Param('id')
    id: string,
    @Body()
    cliente: updateClienteDto
  ) {
    return this.appService.updateCliente(cliente, id)
  }

  @Delete('client/:id')
  deleteCliente(
    @Param('id') id: string
  ) {
    return this.appService.delete(id)
  }

}
