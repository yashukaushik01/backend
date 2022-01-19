import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EmployeeModule } from './Employees/employee.module';
import { LeaveModule } from './Leaves/leave.module';

@Module({
  imports: [EmployeeModule, LeaveModule, MongooseModule.forRoot('mongodb+srv://yash:WhtZduw6BI2gV15K@cluster0.85gje.mongodb.net/employeeDatabase?retryWrites=true&w=majority')],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}