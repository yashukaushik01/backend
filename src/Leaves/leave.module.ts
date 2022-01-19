import { Module } from '@nestjs/common';
import { MongooseModule, Schema } from '@nestjs/mongoose';
import { LeaveController } from './leave.controller';
import { LeaveService } from './leave.service';
import { LeaveSchema } from './leave.model';
import { EmployeeSchema } from 'src/Employees/employee.model';

@Module({
  imports: [MongooseModule.forFeature([
    {name: 'Employee', schema: EmployeeSchema}, 
    {name: 'Leave', schema: LeaveSchema}
])],
  controllers: [LeaveController],
  providers: [LeaveService],
})
export class LeaveModule {}