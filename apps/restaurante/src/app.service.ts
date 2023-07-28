import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class AppService {

  constructor(
    @Inject('CLIENTE_SERVICE')
    private readonly clienteMicroService: ClientProxy
  ) {

  }
  getHello(): string {
    return 'Hello World!';
  }

  emitirNuevCliente() {
    this.clienteMicroService.emit('NUEVO_CLIENTE', {
      name: 'Ing. Gerardo Luis Cárdenas González ',
      user: 'gera',
      email: 'lorherald@gmail.com',
      phone: 52543329,
      age: 40
    })
    return 'enviado a la cola.'
  }
}
