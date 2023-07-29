import { Inject, Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { createClientDto } from 'apps/cliente/src/dto/cliente.dto';
import { updateClienteDto } from 'apps/cliente/src/dto/cliente.update.dto';
import { ICliente } from 'apps/cliente/src/schemas/cliente.schemas';

import { Observable, catchError, from, of } from 'rxjs';

import { map, tap, mergeMap } from 'rxjs/operators';


@Injectable()
export class RestauranteGateWayService {

  //Vars
  private clienteUpdated = new ICliente();

  constructor(
    @Inject('RESTAURANTE_SERVICE')
    private readonly restauranteMicroService: ClientProxy
  ) {

  }

  definirRestaurante(cliente: createClientDto): Observable<ICliente> {
    // console.log(cliente)
    try {
      // return from(this.clienteMicroService.send<ICliente, createClientDto>({ cmd: 'create' }, cliente))
      //   .pipe(
      //     map(cli => {
      //       if (cli)
      //         return cli;
      //     }),
      //     catchError(error => {
      //       throw error
      //     })
      //   )
      return
    } catch (error) {
      throw error
    }

  }


  updateCliente(cliente: updateClienteDto, id: string): Observable<ICliente> {

    cliente = { ...cliente, id: id }

    //Verificar que exista el cliente antes de proceder a su actualizacion.
    try {
      // return this.findOne(id)
      //   .pipe(
      //     mergeMap(cli => {
      //       if (!cli) {
      //         throw new HttpException(`No encontrado.`, HttpStatus.NOT_FOUND)
      //       }
      //       return this.clienteMicroService.send<ICliente, updateClienteDto>({ cmd: 'update' }, cliente)
      //     }),
      //     catchError(error => {
      //       throw error
      //     })
      //   );
      return
    } catch (error) {
      throw error
    }

  }

  findOne(id: string): Observable<ICliente> {

    try {
      // return from(this.clienteMicroService.send<ICliente, string>({ cmd: 'get_one' }, id))
      //   .pipe(
      //     mergeMap(cli => {
      //       if (!cli) {
      //         throw new HttpException(`No encontrado.`, HttpStatus.NOT_FOUND)
      //       }
      //       return of(cli)
      //     }),
      //     catchError(error => {
      //       throw error
      //     })
      //   );
      return
    } catch (error) {
      throw error
    }

  }

  delete(id: string): Observable<ICliente> {
    // return from(this.clienteMicroService.send<ICliente, string>({ cmd: 'delete' }, id))
    return
  }

  async findAllClientes() {
    // const clientes = this.clienteMicroService.emit('clientes', [])
    return
    // clientes.subscribe(console.log)
    // return clientes
  }

  findAll(): Observable<ICliente[]> {
    // return from(this.clienteMicroService.send<ICliente[]>({ cmd: 'listado' }, {}));
    return
  }


}
