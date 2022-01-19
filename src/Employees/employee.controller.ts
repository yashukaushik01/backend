import { Controller, Get, Post, Body, Param, Put, Delete, Res } from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { Request, Response } from 'express';
import { EmployeeAddModel, EmployeeUpdateModel } from './employee.interface';
import { statusCode } from 'src/app.enums';
import { ResModel } from 'src/app.interface';

@Controller('employee')
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}

  handleResponse(result: ResModel, res:Response){
    switch (result.statusCode){
      case statusCode.OK:
        res.status(200).send(result);
      case statusCode.CREATED:
        res.status(201).send(result);
      case statusCode.NO_CONTENT:
        res.status(204).send(result);
      case statusCode.Unprocessable_Entity:
        res.status(422).send(result);
    }
  }

  validateEmail(email: string) {
  const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}

  @Get()
  async getAllEmployees(@Res() res:Response) {
    const result = await this.employeeService.getAllEmployees();
    this.handleResponse(result, res);
  }

  @Get(':email')
  async getEmployee(@Param('email') email: string, @Res() res:Response) {
    const result = await this.employeeService.getEmployee(email);
    this.handleResponse(result, res);
  }

  @Post()
  async addEmploye(@Body() completeBody: EmployeeAddModel, @Res() res:Response){
    if(this.validateEmail(completeBody.address.email)){
      const result = await this.employeeService.addEmployee(completeBody);
      this.handleResponse(result, res);
    } else {
      res.send({"statusCode": 200, "message": "Provide a valid email", "model": null});
    }
  }

  @Post(':email')
  async verifyUser(@Param('email') email, @Body() completeBody, @Res() res: Response){
    const result = await this.employeeService.verifyUser(email, completeBody);
    this.handleResponse(result, res);
  }

  @Put(':email')
  async updateEmployee(
    @Param('email') email: string,
    @Body() toUpdate: EmployeeUpdateModel, 
    @Res() res:Response
  ){
    console.log(toUpdate);
    const result = await this.employeeService.updateEmployee(email, toUpdate);
    this.handleResponse(result, res);
  }

  @Delete(':empCode')
  async deleteEmployee(@Param('empCode') empCode: string, @Res() res: Response){
    const result = await this.employeeService.deleteEmployee(empCode);
    this.handleResponse(result, res);
  }
}
