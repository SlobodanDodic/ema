import { Module } from '@nestjs/common';
import { CalculationService } from './calculation.service';
import { EmployeeService } from '../employee/employee.service';
import { PrismaService } from '../prisma/prisma.service';
import { ScheduleModule } from '@nestjs/schedule';
import { BenefitModule } from 'src/benefit/benefit.module';
import { LiabilityModule } from 'src/liability/liability.module';

@Module({
  imports: [ScheduleModule.forRoot(), BenefitModule, LiabilityModule],
  providers: [CalculationService, EmployeeService, PrismaService],
})
export class CalculationModule {}
