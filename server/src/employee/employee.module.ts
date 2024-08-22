import { Module } from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { EmployeeResolver } from './employee.resolver';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  providers: [EmployeeService, EmployeeResolver, PrismaService],
})
export class EmployeeModule {}
