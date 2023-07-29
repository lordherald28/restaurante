import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ICliente } from '../../../cliente/src/schemas/cliente.schemas';
import { IRestaurante } from 'apps/restaurante/src/schema/restaurante.schemas';

import * as mongoose from 'mongoose';

export type OrderDocument = IOrder & Document;

@Schema({
    versionKey: false,
    timestamps: true,
})

export class IOrder {

    @Prop({
        required: true,
        type: String,
        minlength: 10
    })
    description: string

    @Prop({
        type: mongoose.Schema.Types.ObjectId, ref: 'ICliente',
        required: true
    })
    client: ICliente

    @Prop({
        type: mongoose.Schema.Types.ObjectId, ref: 'IRestaurante'
    })
    restaurant: IRestaurante

    @Prop()
    date:Date;
}

export const OrderSchema = SchemaFactory.createForClass(IOrder);