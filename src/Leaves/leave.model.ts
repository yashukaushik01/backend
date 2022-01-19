import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

export type LeaveDocument = Leave & mongoose.Document;

@Schema()
export class Leave {
    @Prop()
    email: string;

    @Prop()
    fromDate: string;

    @Prop()
    toDate: string;

    @Prop()
    reason: string;

    @Prop({
        default: 'Requested'
    })
    status: string;

    @Prop()
    reasonRejected: string;

    @Prop()
    nosOfDays: number;

    @Prop()
    createdAt: Date;

    @Prop()
    createdBy: mongoose.Types.ObjectId;

    @Prop()
    updatedAt: Date;

    @Prop()
    updatedBy: mongoose.Types.ObjectId;
}

export const LeaveSchema = SchemaFactory.createForClass(Leave);


// export const LeaveSchema = new mongoose.Schema({
//     empCode: String,
//     fromDate: Date,
//     toDate: Date,
//     reason: String,
//     status: String
// })

// export interface Leave {
//     empCode: string,
//     fromDate: Date,
//     toDate: Date,
//     reason: string,
//     status: string
// }