import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { ICliente } from 'apps/interface/cliente.interface';

@Controller('app')
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get('clientes')
  findAll() {
    return this.appService.findAll()
  }

  @Post('newClient')
  async nuevoCliente(
    @Body()
    cliente: ICliente
  ) {
    return this.appService.emitirNuevCliente(cliente)
  }

  @Patch('update-cliente')
  updateCliente(
    @Param('email')
    email: string,
    @Body()
    cliente: ICliente
  ) {
    return this.appService.updateCliente(cliente,email)
  }

  @Delete('delete-cliente/:email')
  deleteCliente(
    @Param('email') email: string
  ) {
    return this.appService.delete(email)
  }

}
