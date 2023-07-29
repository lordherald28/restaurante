import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ICliente } from './schemas/cliente.schemas';
import { Model } from 'mongoose';
import { createClientDto } from './dto/cliente.dto';
import { updateClienteDto } from './dto/cliente.update.dto';

@Injectable()
export class ClienteService {

  constructor(
    @InjectModel(ICliente.name) private clientModel: Model<ICliente>
  ) {

  }

  async create(cliente: createClientDto): Promise<ICliente> {
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

  async update(cliente: updateClienteDto): Promise<ICliente> {
    // console.log(cliente)
    const clienteUpdate = await this.clientModel.findByIdAndUpdate(cliente.id, cliente, { new: true }).exec();
    return clienteUpdate
    // return await this.clientModel.findByIdAndUpdate(cliente.id, cliente, { new: true }).exec();
  }

  async delete(id: string): Promise<ICliente> {
    return await this.clientModel.findByIdAndDelete(id).exec()
  }

  async findOne(id: string): Promise<ICliente> {
    return await this.clientModel.findById(id).exec()
  }
}
