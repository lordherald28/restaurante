import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ICliente } from './schemas/cliente.schemas';
import { Model } from 'mongoose';

@Injectable()
export class ClienteService {

  constructor(
    @InjectModel(ICliente.name) private clientModel: Model<ICliente>
  ) {

  }

  async create(cliente: ICliente): Promise<ICliente> {
    try {
      return await (new this.clientModel(cliente).save());
    } catch (error) {
      // console.error(error);
      throw error;
    }
  }

  async findAll(): Promise<ICliente[]> {
    return await this.clientModel.find().exec();
  }

  async ListarEvento(): Promise<ICliente[]> {
    return await this.clientModel.find().exec();
  }

  async update(cliente: ICliente, email: string): Promise<ICliente> {
    return await this.clientModel.findOneAndUpdate({ name: cliente.name }, cliente).exec()
  }

  async delete(name: string): Promise<ICliente> {
    return await this.clientModel.findOneAndDelete({ name: name }).exec()
  }
}
