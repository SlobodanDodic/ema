import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { LiabilityInput } from './dto/liability.input';

@Injectable()
export class LiabilityService {
  constructor(private readonly prisma: PrismaService) {}

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

  async getTotalLiabilities() {
    const result = await this.prisma.liability.aggregate({
      _sum: {
        amount: true,
      },
    });

    return result._sum.amount;
  }

  async getTotalLiabilitiesByEmployee(employeeId: string) {
    const result = await this.prisma.liability.aggregate({
      _sum: {
        amount: true,
      },
      where: {
        employeeId,
      },
    });

    return result._sum.amount;
  }
}
