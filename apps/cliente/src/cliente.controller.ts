import { Controller, /* Get */ } from '@nestjs/common';
import { ClienteService } from './cliente.service';
import { EventPattern } from '@nestjs/microservices';

@Controller()
export class ClienteController {
  constructor(private readonly clienteService: ClienteService) { }

  // @Get()
  // getHello(): string {
  //   return this.clienteService.getHello();
  // }

  @EventPattern('NUEVO_CLIENTE')
  nuevoClienteEvento(cliente: any) {
    this.clienteService.nuevoCliente(cliente)
  }
}
