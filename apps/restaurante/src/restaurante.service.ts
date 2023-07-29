import { Injectable } from '@nestjs/common';
import { Observable, from } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { defineRestauranteDto, updateRestauranteDto } from './dto';
import { IRestaurante } from './schema/restaurante.schemas';
import { InjectModel } from '@nestjs/mongoose';

import { Model } from 'mongoose';



@Injectable()
export class RestauranteService {

  constructor(
    @InjectModel(IRestaurante.name) private restauranteModel: Model<IRestaurante>
  ) {

  }

  async create(restaurante: defineRestauranteDto): Promise<IRestaurante | { error: string }> {
    try {
      const existeRestaurante = await this.restauranteModel.findOne({ name: restaurante.name }).exec();

      if (existeRestaurante) {
        // console.log('El nombre o el correo ya existen');
        return { error: 'Ya existe un restaurante con ese nombre' };
      }
      return await (new this.restauranteModel(restaurante).save({ validateBeforeSave: true }));
    } catch (error) {
      // console.error(error);
      return { error: error.message };
    }
  }

  async findAll(): Promise<IRestaurante[]> {
    return await this.restauranteModel.find().exec();
  }

  async update(restaurante: updateRestauranteDto): Promise<IRestaurante> {
    // console.log(cliente)
    const clienteUpdate = await this.restauranteModel.findByIdAndUpdate(restaurante.id, restaurante, { new: true }).exec();
    return clienteUpdate
    // return await this.clientModel.findByIdAndUpdate(cliente.id, cliente, { new: true }).exec();
  }


  async delete(id: string): Promise<IRestaurante> {
    return await this.restauranteModel.findByIdAndDelete(id).exec()
  }

  async findOne(id: string): Promise<IRestaurante> {
    // console.log(id)
    return await this.restauranteModel.findById(id).exec()
  }

}
