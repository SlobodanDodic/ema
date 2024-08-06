import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { LiabilityInput } from './dto/liability.input';
import { Employee } from 'src/employee/entities/employee.entity';
import { BenefitService } from 'src/benefit/benefit.service';
import { CalculationService } from 'src/calculation/calculation.service';

@Injectable()
export class LiabilityService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly benefitService: BenefitService,
    private readonly calculationService: CalculationService,
  ) {}

  async createLiability(data: LiabilityInput) {
    return this.prisma.liability.create({
      data: {
        employee: { connect: { id: data.employeeId } },
        amount: data.amount,
        recordedDate: data.recordedDate,
      },
    });
  }

  async liabilitiesByEmployee(employeeId: string) {
    return this.prisma.liability.findMany({
      where: { employeeId },
    });
  }

  async getAllLiabilities() {
    return this.prisma.liability.findMany({
      include: {
        employee: true,
      },
    });
  }

  async calculateEmployeeLiabilities(employee: Employee) {
    const healthcare = await this.benefitService.getAllHealthcareData();
    const fitpass = await this.benefitService.getAllFitpassData();

    const totalPrice = this.calculationService.calculateTotalPrice(
      employee,
      healthcare,
      fitpass,
    );

    return totalPrice;
  }

  async updateLiabilities(employeeId: string, newLiability: number) {
    try {
      await this.prisma.$transaction(async (prisma) => {
        await prisma.employee.update({
          where: { id: employeeId },
          data: {
            cumulativeLiabilities: newLiability,
            lastCalculation: new Date(),
          },
        });
      });
    } catch (error) {
      console.error(
        `Failed to update liabilities for employee ${employeeId}:`,
        error,
      );
      throw new Error('Could not update liabilities');
    }
  }
}
