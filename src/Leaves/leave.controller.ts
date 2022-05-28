import { Controller, Get, Post, Body, Put, Delete, Param, Res } from '@nestjs/common';
import { LeaveService } from './leave.service';
import { Request, Response } from 'express';
import { LeaveAddModel } from './leave.interface'; 
import { statusCode } from 'src/app.enums';
import { ResModel } from 'src/app.interface';

@Controller('leave')
export class LeaveController {
  constructor(private readonly leaveService: LeaveService) {}


  handleStatusCode(result: ResModel, res:Response){
    switch (result.statusCode){
      case statusCode.OK:
        return res.status(200);
      case statusCode.CREATED:
        return res.status(201);
      case statusCode.NO_CONTENT:
        return res.status(204);
    }
  }

  @Get()
  async getAllLeaves(@Res() res:Response) {
    const result = await this.leaveService.getAllLeaves();
    res = this.handleStatusCode(result, res);
    res.send(result);
  }

  @Get(':email')
  async getEmployeeLeaves(@Param('email') email: string, @Res() res: Response) {
    const result = await this.leaveService.getEmployeeLeaves(email);
    res = this.handleStatusCode(result, res);
    res.send(result);
  }

  @Post()
  async addLeave(@Body() completeBody:LeaveAddModel, @Res() res: Response) {
    const result = await this.leaveService.addLeave(completeBody);
    res = this.handleStatusCode(result, res);
    res.send(result);
  }

  @Put(':leaveId')
  async updateLeave(
    @Param('leaveId') leaveId: string,
    @Body() body:{
      statusToUpdate: string,
      reasonRejected: string
    },
    @Res() res:Response) {
      console.log(body.reasonRejected)
      const result = await this.leaveService.updateLeave(leaveId, body.statusToUpdate, body.reasonRejected);
      res = this.handleStatusCode(result, res);
      res.send(result);
  }
}