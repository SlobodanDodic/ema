import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { EmployeeInput } from './dto/employee.input';

@Injectable()
export class EmployeeService {
  constructor(private readonly prisma: PrismaService) {}

  async createEmployee(data: EmployeeInput) {
    return this.prisma.employee.create({
      data: {
        fullName: data.fullName,
        jobTitle: data.jobTitle,
        phoneNumber: data.phoneNumber,
        birthday: data.birthday,
        contract: data.contract,
        eyes: data.eyes,
        safety: data.safety,
        fire: data.fire,
        firstAid: data.firstAid,
        cumulativeLiabilities: data.cumulativeLiabilities,
        lastCalculation: data.lastCalculation,
        healthCareMembers: {
          create: data.healthCareMembers.map((member) => ({
            name: member.name,
            category: member.category,
            insurance: member.insurance,
            start: member.start,
            end: member.end,
          })),
        },
        fitpassMembers: {
          create: data.fitpassMembers.map((member) => ({
            name: member.name,
            category: member.category,
            start: member.start,
            end: member.end,
          })),
        },
      },
      include: {
        healthCareMembers: true,
        fitpassMembers: true,
      },
    });
  }

  async updateEmployee(id: string, data: EmployeeInput) {
    return this.prisma.employee.update({
      where: { id },
      data: {
        fullName: data.fullName,
        jobTitle: data.jobTitle,
        phoneNumber: data.phoneNumber,
        birthday: data.birthday,
        contract: data.contract,
        eyes: data.eyes,
        safety: data.safety,
        fire: data.fire,
        firstAid: data.firstAid,
        cumulativeLiabilities: data.cumulativeLiabilities,
        lastCalculation: data.lastCalculation,
        healthCareMembers: {
          deleteMany: {},
          create: data.healthCareMembers.map((member) => ({
            name: member.name,
            category: member.category,
            insurance: member.insurance,
            start: member.start,
            end: member.end,
          })),
        },
        fitpassMembers: {
          deleteMany: {},
          create: data.fitpassMembers.map((member) => ({
            name: member.name,
            category: member.category,
            start: member.start,
            end: member.end,
          })),
        },
      },
      include: {
        healthCareMembers: true,
        fitpassMembers: true,
      },
    });
  }

  async deleteEmployee(id: string) {
    return this.prisma.employee.delete({ where: { id } });
  }

  async getAllEmployees() {
    return this.prisma.employee.findMany({
      include: {
        healthCareMembers: true,
        fitpassMembers: true,
      },
    });
  }

  async getOneEmployee(id: string) {
    return this.prisma.employee.findUnique({
      where: { id },
      include: {
        healthCareMembers: true,
        fitpassMembers: true,
      },
    });
  }
}
