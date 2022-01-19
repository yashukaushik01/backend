import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Document } from 'mongoose';
import { EmployeeDocument } from 'src/Employees/employee.model';
import { LeaveDocument } from './leave.model';
import { LeaveAddModel } from './leave.interface'; 
import { ResModel } from 'src/app.interface';
import { statusCode } from 'src/app.enums';

@Injectable()
export class LeaveService {
    constructor(
        @InjectModel('Leave') private leaveModel: Model<LeaveDocument>,
        @InjectModel('Employee') private employeeModel: Model<EmployeeDocument>
    ) {}

  async getAllLeaves(): Promise<ResModel>{
    try {
      let result: ResModel;
      const leaves = await this.leaveModel.find();
      result = {statusCode: statusCode.OK, message: "Leave found", model:leaves};
      return result;
    } catch(Error) {
      throw Error;
    }
  }

  async getEmployeeLeaves(email: string): Promise<ResModel> {
    try {
      let result: ResModel;
      const emp = await this.employeeModel.findOne({email: email});
      if (!emp) {
        result = {statusCode: statusCode.OK, message: "User not found", model: null};
        return result;
      } else {
        const leaves = await this.leaveModel.find({email: email});
        if (leaves.length === 0){
          result = {statusCode: statusCode.OK, message: "Leave not found", model: null};
          return result;
        }
        result = {statusCode: statusCode.OK, message: "Leave found", model: leaves};
        return result;
      }
    } catch(Error) {
      throw Error;
    } 
  }

  async addLeave(completeBody: LeaveAddModel): Promise<ResModel> {
    try{
      let result: ResModel;
      const emp = await this.employeeModel.findOne({'address.email': completeBody.email});
      if (!emp){
        result = {statusCode: statusCode.Unprocessable_Entity, message: "User not found", model: null};
        return result;
      } else {
        if (emp.allotedLeaves==0){
          result = {statusCode: statusCode.OK, message: "Your remaining leaves are 0", model: null};
          return result;
        }
        const newLeave = new this.leaveModel(completeBody);
        // newLeave.empCode = emp.empCode;
        newLeave.createdAt = new Date();
        const leave = await newLeave.save();
        result = {statusCode: statusCode.OK, message: "Leave added", model: leave};
        return result;
      }
    } catch(Error) {
      throw Error;
    }
  }

  async updateLeave(leaveId: string, statusToUpdate: string, reasonRejected: string): Promise<ResModel> {
    try{
        let result: ResModel;
        let leave = await this.leaveModel.findById(leaveId);
        leave.status = statusToUpdate;
        if(reasonRejected){
          leave.reasonRejected = reasonRejected;
        }
        leave.updatedAt = new Date();
        await leave.save();
        result =  {statusCode: statusCode.OK, message: "Leave Updated", model: leave};
        return result;
    } catch(Error) {
      throw Error;
    }
  }
}
