import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Observable, from, of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { defineRestauranteDto } from '../../../restaurante/src/dto/restaurante.dto';
import { IRestaurante } from '../../../restaurante/src/schema/restaurante.schemas';
import { updateRestauranteDto } from '../../../restaurante/src/dto/restaurante.update.dto';

import { updateClienteDto } from 'apps/cliente/src/dto/cliente.update.dto';



@Injectable()
export class RestauranteGateWayService {

  constructor(
    @Inject('RESTAURANTE_SERVICE')
    private readonly restauranteMicroService: ClientProxy

  ) {

  }

  create(restaurante: defineRestauranteDto): Observable<IRestaurante> {
    // console.log(cliente)
    try {
      return from(this.restauranteMicroService.send<IRestaurante, defineRestauranteDto>({ cmd: 'create' }, restaurante))
        .pipe(
          map(cli => {
            if (cli)
              return cli;
          }),
          catchError(error => {
            throw error
          })
        )
    } catch (error) {
      throw error
    }
  }


  update(restaurante: updateRestauranteDto, id: string): Observable<IRestaurante> {
    restaurante = { ...restaurante, id: id }
    //Verificar que exista el cliente antes de proceder a su actualizacion.
    try {
      return this.findOne(id)
        .pipe(
          mergeMap(cli => {
            if (!cli) {
              throw new HttpException(`No encontrado.`, HttpStatus.NOT_FOUND)
            }
            return this.restauranteMicroService.send<IRestaurante, updateClienteDto>({ cmd: 'update' }, restaurante)
          }),
          catchError(error => {
            throw error
          })
        );
    } catch (error) {
      throw error
    }

  }

  findOne(id: string): Observable<IRestaurante> {
    try {
      // console.log(id)
      return from(this.restauranteMicroService.send<IRestaurante, string>({ cmd: 'get_one' }, id))
        .pipe(
          mergeMap(res => {
            if (!res) {
              throw new HttpException(`No encontrado.`, HttpStatus.NOT_FOUND)
            }
            return of(res)
          }),
          catchError(error => {
            throw error
          })
        );
    } catch (error) {
      throw error
    }

  }

  delete(id: string): Observable<IRestaurante> {
    return from(this.restauranteMicroService.send<IRestaurante, string>({ cmd: 'delete' }, id))
  }


  findAll(): Observable<IRestaurante[]> {
    return from(this.restauranteMicroService.send<IRestaurante[]>({ cmd: 'listado' }, {}));
  }


}
