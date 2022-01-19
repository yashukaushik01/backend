import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { EmployeeDocument } from './employee.model'; //type for Employee Document(record)
import { LeaveDocument } from '../Leaves/leave.model' //type for Leave Document(record)
import { ResModel } from 'src/app.interface';
import { statusCode } from 'src/app.enums';
import { EmployeeAddModel, EmployeeUpdateModel } from './employee.interface';

@Injectable()
export class EmployeeService {
    constructor(
      @InjectModel('Employee') private employeeModel: Model<EmployeeDocument>,
      @InjectModel('Leave') private leaveModel: Model<LeaveDocument>
    ) {}

  async getAllEmployees() : Promise<ResModel>{
    let result:ResModel;
    try {
      const emps = await this.employeeModel.find();
      if (emps.length === 0){
        result = {statusCode: statusCode.Unprocessable_Entity, message: "No User", model: null};
        return result;
      }
      result = {statusCode: statusCode.OK, message: "Users Found", model: emps};
      return result;
    } catch(Error) {
      return Error;
    }
  }

  async getEmployee(email: string): Promise<ResModel> {
    let result:ResModel;
    try {
      const emp = await this.employeeModel.findOne({'address.email': email});
      if(!emp){
        result = {statusCode: statusCode.OK, message: "User not found", model: null};
        return result;
      }
      result = {statusCode: statusCode.OK, message: "User found", model:emp};
      return result;
    } catch(Error) {
      return Error;
    }
  }

  async addEmployee(completeBody: EmployeeAddModel): Promise<ResModel> {
    try {
      let empCode: any;
      let result: ResModel;
      const emps = await this.employeeModel.find();
      if (emps.length === 0){
        empCode = 1;
      } else {
        const lastEmp = emps[emps.length-1];
        empCode = Number(lastEmp.empCode) + 1;
      }
      const newEmp = new this.employeeModel(completeBody);
      newEmp.empCode = empCode;
      newEmp.createdAt = new Date();
      const emp = await newEmp.save();
      result = {statusCode: statusCode.OK, message: "Added Successfully", model:emp};
      return result;
    } catch(Error) {
      throw Error;
    }
  }

  async verifyUser(email: string, completeBody): Promise<ResModel>{
    try{
      let result: ResModel;
      let password = completeBody.password;
      const emp = await this.employeeModel.findOne({'address.email': email})
      if(!emp){
        result = {statusCode: statusCode.OK, message: "Email not found", model:null}
        return result;
      } else {
        if (emp.password === password){
          result = {statusCode: statusCode.OK, message: "User Verified", model:emp}
          return result;
        } else {
          result = {statusCode: statusCode.OK, message: "Incorrect password", model:null}
          return result;
        }
      }
    } catch(Error) {
      throw Error;
    }
  }

  async updateEmployee(email: string, toUpdate: EmployeeUpdateModel): Promise<ResModel> {
    try {
      let result:ResModel;
      const emp = await this.employeeModel.findOne({'address.email': email});
      if(!emp){
        result = {statusCode: statusCode.Unprocessable_Entity, message: "User not found", model: null};
        return result;
      } else {
        if(toUpdate.name){
          emp.name = toUpdate.name;
        }
        if(toUpdate.jobTitle){
          emp.jobTitle = toUpdate.jobTitle;
        }
        if(toUpdate.dateOfBirth){
          emp.dateOfBirth = toUpdate.dateOfBirth;
        }
        if(toUpdate.address){
          emp.address = toUpdate.address;
        }
        if(toUpdate.allotedLeaves){
          emp.allotedLeaves = toUpdate.allotedLeaves;
        }
        if(toUpdate.password){
          emp.password = toUpdate.password;
        }
          let dateNow = new Date()
          emp.updatedAt = dateNow;
          await emp.save();
          result = {statusCode: statusCode.OK, message: "Updated User Successfully", model: emp};
          return result;
      }
    } catch(Error){
      throw Error;
    }
  }
  
  async deleteEmployee(empCode: string): Promise<ResModel>{
    try {
      let result:ResModel;
      const ans = await this.employeeModel.deleteOne({empCode: empCode});
      if (ans.deletedCount === 0){
        result = {statusCode: statusCode.Unprocessable_Entity, message: "User not found", model: null};
        return result;
      } else {
        result = {statusCode: statusCode.OK, message: "User Deleted Successfully", model: null};
        return result; 
      }
    } catch(Error) {
        throw Error;
    }
  }
  
}
