import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { createClientDto } from 'apps/cliente/src/dto/cliente.dto';
import { updateClienteDto } from 'apps/cliente/src/dto/cliente.update.dto';
import { ICliente } from 'apps/cliente/src/schemas/cliente.schemas';
import { Observable, from } from 'rxjs';
// import { map, tap } from 'rxjs/operators';


@Injectable()
export class ClientGateWayService {

  constructor(
    @Inject('CLIENTE_SERVICE')
    private readonly clienteMicroService: ClientProxy
  ) {

  }

  emitirNuevCliente(cliente: createClientDto): Observable<ICliente> {
    // console.log(cliente)
    return from(this.clienteMicroService.send<ICliente, createClientDto>({ cmd: 'create' }, cliente));
  }


  updateCliente(cliente: updateClienteDto, id: string): Observable<ICliente> {
    // console.log(cliente)
    // console.log(id)
    cliente = { ...cliente, id: id }
    return from(this.clienteMicroService.send<ICliente, updateClienteDto>({ cmd: 'update' }, cliente))
  }

  findOne(id: string): Observable<ICliente> {
    return from(this.clienteMicroService.send<ICliente, string>({ cmd: 'get_one' }, id))
  }

  delete(id: string): Observable<ICliente> {
    return from(this.clienteMicroService.send<ICliente, string>({ cmd: 'delete' }, id))
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
