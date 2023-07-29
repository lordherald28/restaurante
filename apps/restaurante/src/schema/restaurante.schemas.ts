

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ICliente } from 'apps/cliente/src/schemas/cliente.schemas';
import { Document } from 'mongoose';
// import { type } from 'os';
import * as mongoose from 'mongoose';

export type IRestauranteDocument = IRestaurante & Document

@Schema({
    timestamps: true,
    versionKey: false,
})
export class IRestaurante {

    @Prop()
    name: string;

    @Prop({
        type: Number,
        min: 1,
        required: true
    })
    capacity: number;

    @Prop()
    Address: string;

    @Prop({
        type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'IClient' }]
    })
    clients: ICliente[]
}

export const IRestauranteSchema = SchemaFactory.createForClass(IRestaurante);