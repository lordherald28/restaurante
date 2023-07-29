import { Inject, Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { createClientDto } from 'apps/cliente/src/dto/cliente.dto';
import { updateClienteDto } from 'apps/cliente/src/dto/cliente.update.dto';
import { ICliente } from 'apps/cliente/src/schemas/cliente.schemas';

import { Observable, from, map, of } from 'rxjs';
// import { map, tap } from 'rxjs/operators';


@Injectable()
export class ClientGateWayService {

  //Vars
  private clienteUpdated = new ICliente();

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

    cliente = { ...cliente, id: id }

    //Verificar que exista el cliente antes de proceder a su actualizacion.
    try {
      this.findOne(id).pipe(
        map(cli => {
          console.log('No existe');
          if (!cli) {
            throw new HttpException('No encontrado.', HttpStatus.NOT_FOUND)
          }
          return cli
        })
      )

      from(this.clienteMicroService.send<ICliente, updateClienteDto>({ cmd: 'update' }, cliente)).subscribe(cli => {
        return cli
      })
      // return from(this.clienteMicroService.send<ICliente, updateClienteDto>({ cmd: 'update' }, cliente))
      console.log(this.clienteUpdated)
      return from(of(this.clienteUpdated))
    } catch (error) {
      console.log(error);
      throw error
    }

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
