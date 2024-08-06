import { Injectable } from '@nestjs/common';
import { FitpassMember } from 'src/employee/entities/fitpass.entity';
import { HealthCareMember } from 'src/employee/entities/healthcare.entity';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class BenefitService {
  constructor(private readonly prisma: PrismaService) {}

  async getAllHealthcareData() {
    return this.prisma.healthcareData.findMany();
  }

  async getAllFitpassData() {
    return this.prisma.fitpassData.findMany();
  }

  async getHealthcareMembersByEmployee(
    employeeId: string,
  ): Promise<HealthCareMember[]> {
    return this.prisma.healthCareMember.findMany({
      where: { employeeId },
    });
  }

  async getFitpassMembersByEmployee(
    employeeId: string,
  ): Promise<FitpassMember[]> {
    return this.prisma.fitpassMember.findMany({
      where: { employeeId },
    });
  }
}
