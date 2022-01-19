import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { EmployeeController } from './employee.controller';
import { EmployeeService } from './employee.service';
import { EmployeeSchema } from './employee.model';
import { LeaveSchema } from 'src/Leaves/leave.model';

@Module({
    imports: [MongooseModule.forFeature([
        {name: 'Employee', schema: EmployeeSchema}, 
        {name: 'Leave', schema: LeaveSchema}
    ])],
    controllers: [EmployeeController],
    providers: [EmployeeService],
})
export class EmployeeModule {}