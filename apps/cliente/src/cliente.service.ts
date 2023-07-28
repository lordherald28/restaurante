import { Injectable } from '@nestjs/common';

@Injectable()
export class ClienteService {
  getHello(): string {
    return 'Hello Micro Service Cliente!';
  }

  nuevoCliente(cliente: any) {
    console.log('Este es el cliente desde el micro-servicio Cliente:', { cliente });

  }
}
