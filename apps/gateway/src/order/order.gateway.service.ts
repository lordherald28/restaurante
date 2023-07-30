import { Inject, Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { createClientDto } from 'apps/cliente/src/dto/cliente.dto';
import { updateClienteDto } from 'apps/cliente/src/dto/cliente.update.dto';
import { ICliente } from 'apps/cliente/src/schemas/cliente.schemas';
import { CreateOrderDto } from 'apps/order/src/dto';
import { IOrder } from 'apps/order/src/schema/order.schema';
import { IRestaurante } from 'apps/restaurante/src/schema/restaurante.schemas';
import { response } from 'express';

import { Observable, catchError, combineLatest, from, of, throwError } from 'rxjs';

import { map, tap, mergeMap, filter, switchMap } from 'rxjs/operators';


@Injectable()
export class OrderGateWayService {

  //Vars
  private clienteUpdated = new ICliente();

  constructor(
    @Inject('ORDER_SERVICE')
    private readonly orderMicroService: ClientProxy,
    @Inject('CLIENTE_SERVICE')
    private readonly clienteMicroService: ClientProxy,
    @Inject('RESTAURANTE_SERVICE')
    private readonly restauranteMicroService: ClientProxy
  ) {

  }


  create(order: CreateOrderDto): Observable<IOrder | HttpException | number> {

    let cliente: ICliente;
    let errorCLiente: boolean = false;
    let orden: IOrder;

    orden = { ...orden, description: 'Cosas pepas' }
    try {
      // obtener las órdenes y la información del restaurante
      const orders$ = this.orderMicroService.send<number, CreateOrderDto>({ cmd: 'count_order_today' }, order);
      const restaurant$ = this.restauranteMicroService.send<IRestaurante, string>({ cmd: 'get_one_restaurante' }, order.restaurant);
      const cliente$ = this.clienteMicroService.send<ICliente, string>({ cmd: 'get_one_cliente' }, order.client);

      // combinar los 3 observables
      const combined$ = combineLatest([orders$, restaurant$, cliente$]);

      // procesar los datos
      const result$ = combined$.pipe(
        mergeMap(([orderCount, restaurant, client]) => {
          // verificamos si el restaurante ha alcanzado su capacidad máxima y la edad del cliente.
          if (client.age < 18) {
            throw new HttpException(`El cliente ${client.name} no cumple con los requisitos para ordenar en el restuarante. Edad de ${client.name} : ${client.age} años`, HttpStatus.BAD_REQUEST)
          }

          if (orderCount >= restaurant.capacity) {
            throw new HttpException(`El restaurante ${restaurant.name} no tiene capacidad, capacidad permitida: ${restaurant.capacity}`, HttpStatus.BAD_REQUEST)
          }

          // si no, entonces creamos la orden
          return this.orderMicroService.send<IOrder, CreateOrderDto>({ cmd: 'create_orden' }, order);
        }),
        catchError((error: HttpException) => {
          return throwError(() => error);
        })
      );

      return result$;

    } catch (error) {
      throw error
    }

  }


  countOrdersForToday(restaurantId: string): Observable<number> {
    return this.restauranteMicroService.send<number, string>({ cmd: 'count_order_today' }, restaurantId)
  }

 
  findAll(): Observable<IOrder[]> {
    console.log('aquiiii')
    return from(this.orderMicroService.send<IOrder[]>({ cmd: 'listado_ordenes' }, {}));
  }


}
