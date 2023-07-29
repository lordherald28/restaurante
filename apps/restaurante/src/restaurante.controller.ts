import { Body, Controller, Delete, Get, Param,  Patch, Post } from '@nestjs/common';
import { AppService } from './restaurante.service';
import { createClientDto } from 'apps/cliente/src/dto/cliente.dto';
import { updateClienteDto } from 'apps/cliente/src/dto/cliente.update.dto';

@Controller('app')
export class AppController {
  constructor(private readonly appService: AppService) { }


  @Post('newClient')
  async nuevoCliente(
    @Body()
    cliente: createClientDto
  ) {
    return this.appService.emitirNuevCliente(cliente)
  }

  @Get('clientes')
  findAll() {
    return this.appService.findAll()
  }

  @Get('clientes/:id')
  findOneCliente(
    @Param('id') id: string
  ) {
    return this.appService.findOne(id)
  }

  @Patch('clientes/:id')
  updateCliente(
    @Param('id')
    id: string,
    @Body()
    cliente: any
  ) {
    return this.appService.updateCliente(cliente, id)
  }

  @Delete('clientes/:id')
  deleteCliente(
    @Param('id') id: string
  ) {
    return this.appService.delete(id)
  }

}
