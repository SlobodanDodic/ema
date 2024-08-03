import { Injectable } from '@nestjs/common';
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
}
