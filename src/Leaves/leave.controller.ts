import { Controller, Get, Post, Body, Put, Delete, Param, Res } from '@nestjs/common';
import { LeaveService } from './leave.service';
import { Request, Response } from 'express';
import { LeaveAddModel } from './leave.interface'; 
import { statusCode } from 'src/app.enums';
import { ResModel } from 'src/app.interface';

@Controller('leave')
export class LeaveController {
  constructor(private readonly leaveService: LeaveService) {}


  handleResponse(result: ResModel, res:Response){
    switch (result.statusCode){
      case statusCode.OK:
        res.status(200).send(result);
      case statusCode.CREATED:
        res.status(201).send(result);
      case statusCode.NO_CONTENT:
        res.status(204).send(result);
    }
  }

  @Get()
  async getAllLeaves(@Res() res:Response) {
    const result = await this.leaveService.getAllLeaves();
    this.handleResponse(result, res);
  }

  @Get(':email')
  async getEmployeeLeaves(@Param('email') email: string, @Res() res: Response) {
    const result = await this.leaveService.getEmployeeLeaves(email);
    this.handleResponse(result, res);
  }

  @Post()
  async addLeave(@Body() completeBody:LeaveAddModel, @Res() res: Response) {
    const result = await this.leaveService.addLeave(completeBody);
    this.handleResponse(result, res);
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
      this.handleResponse(result, res);
  }
}