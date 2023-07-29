import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ICliente } from 'apps/cliente/src/schemas/cliente.schemas';
import { Observable, from, timeout } from 'rxjs';
// import { map, tap } from 'rxjs/operators';


@Injectable()
export class AppService {

  constructor(
    @Inject('CLIENTE_SERVICE')
    private readonly clienteMicroService: ClientProxy
  ) {

  }

  emitirNuevCliente(cliente: ICliente): Observable<ICliente> {
    // console.log(cliente)
    return from(this.clienteMicroService.send<ICliente, ICliente>({ cmd: 'create' }, cliente));
  }


  updateCliente(cliente: ICliente, email: string): Observable<ICliente> {
    return from(this.clienteMicroService.send<ICliente, { cliente: ICliente, email: string }>({ cmd: 'update' }, { cliente: cliente, email: email }))
  }

  delete(name: string): Observable<ICliente> {
    return from(this.clienteMicroService.send<ICliente, string>({ cmd: 'delete' }, name))
  }

  async findAllClientes() {
    const clientes = this.clienteMicroService.emit('clientes', [])
    // clientes.subscribe(console.log)
    return clientes
  }

  findAll(): Observable<ICliente[]> {
    return from(this.clienteMicroService.send<ICliente[]>({ cmd: 'listado' }, {}));
  }


}
