import { Module } from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { EmployeeResolver } from './employee.resolver';
import { PrismaService } from 'src/prisma/prisma.service';
import { TasksService } from 'src/calculation/tasks.service';
import { CalculationService } from 'src/calculation/calculation.service';
import { BenefitModule } from 'src/benefit/benefit.module';
import { LiabilityModule } from 'src/liability/liability.module';

@Module({
  imports: [BenefitModule, LiabilityModule],
  providers: [
    EmployeeService,
    EmployeeResolver,
    CalculationService,
    TasksService,
    PrismaService,
  ],
  exports: [EmployeeService],
})
export class EmployeeModule {}
