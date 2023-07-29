import { Controller, /* Get */ } from '@nestjs/common';
import { ClienteService } from './cliente.service';
import { EventPattern, MessagePattern } from '@nestjs/microservices';
import { ICliente } from 'apps/interface/cliente.interface';
import { Observable, of } from 'rxjs';

@Controller()
export class ClienteController {
  constructor(private readonly clienteService: ClienteService) { }


  @MessagePattern({ cmd: 'create' })
  create(cliente: ICliente) {
    console.log('aqui')
    return this.clienteService.create(cliente)
  }


  @MessagePattern({ cmd: 'listado' })
  async ListadoClientesMessage() {
    return this.clienteService.findAll()
  }

  @MessagePattern({ cmd: 'update' })
  async update(cliente: ICliente, email: string) {
    return this.clienteService.update(cliente, email)
  }

  @MessagePattern({ cmd: 'delete' })
  async delete(name: string) {
    return this.clienteService.delete(name)
  }


}
