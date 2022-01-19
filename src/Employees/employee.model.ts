import * as mongoose from 'mongoose';
import { Role } from 'src/app.enums';

// export type EmployeeDocument = Employee & Document;


export const EmployeeSchema = new mongoose.Schema({
    // id: ObjectId,
    empCode: {
        type: String,
        unique: true,
        required: true
    },
    jobTitle: {
        type: String,
        unique: false,
        required:true
    },
    deptId: {
        type: String,
        required:true
    },
    name: {
        type: String,
        required:true
    }, 
    role: {
        type: String,
        enum: Role,
        required:true
    },
    dateOfBirth: {
        type: String
    },
    address: {
        houseNo: String,
        area: String,
        city: String,
        state: String,
        country: String,
        phone: Number,
        email: {
            type: String,
            unique: true,
            required: true
        }
    },
    password: String,
    allotedLeaves: Number,
    createdAt: Date,
    createdBy: mongoose.Types.ObjectId,
    updatedAt: Date,
    updateAt: mongoose.Types.ObjectId
});

export interface EmployeeDocument {
    empCode: string,
    jobTitle: string,
    deptId: string,
    name: string, 
    role: string,
    dateOfBirth: string,
    address?: {
        houseNo?: string,
        area?: string,
        city?: string,
        state?: string,
        country?: string,
        phone?: number,
        email?: string
    },
    password: string,
    allotedLeaves: Number,
    createdAt: Date,
    updatedAt: Date
}
