import { Controller, /* Get */ } from '@nestjs/common';
import { ClienteService } from './cliente.service';
import { MessagePattern } from '@nestjs/microservices';

import { createClientDto } from './dto/cliente.dto';
import { updateClienteDto } from './dto/cliente.update.dto';

@Controller()
export class ClienteController {
  constructor(private readonly clienteService: ClienteService) { }


  @MessagePattern({ cmd: 'create' })
  create(cliente: createClientDto) {
    // console.log('aqui')
    return this.clienteService.create(cliente)
  }


  @MessagePattern({ cmd: 'listado' })
  async ListadoClientesMessage() {
    return this.clienteService.findAll()
  }

  @MessagePattern({ cmd: 'get_one' })
  async findOne(id: string) {
    return this.clienteService.findOne(id)
  }

  @MessagePattern({ cmd: 'update' })
  async update(cliente: updateClienteDto) {
    // console.log(cliente)
    // console.log(cliente.id)
    return this.clienteService.update(cliente)
  }

  @MessagePattern({ cmd: 'delete' })
  async delete(id: string) {
    return this.clienteService.delete(id)
  }



}
