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
        healthCareMembers: {
          create: data.healthCareMembers.map((member) => ({
            name: member.name,
            category: member.category,
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
        ...data,
        healthCareMembers: {
          upsert:
            data.healthCareMembers?.map((member) => ({
              where: { id: member.id ?? '' },
              update: {
                name: member.name,
                category: member.category,
                start: member.start,
                end: member.end,
              },
              create: {
                name: member.name,
                category: member.category,
                start: member.start,
                end: member.end,
              },
            })) || [],
        },
        fitpassMembers: {
          upsert:
            data.fitpassMembers?.map((member) => ({
              where: { id: member.id ?? '' },
              update: {
                name: member.name,
                category: member.category,
                start: member.start,
                end: member.end,
              },
              create: {
                name: member.name,
                category: member.category,
                start: member.start,
                end: member.end,
              },
            })) || [],
        },
      },
      include: {
        healthCareMembers: true,
        fitpassMembers: true,
      },
    });
  }

  async findAllEmployees() {
    return this.prisma.employee.findMany({
      include: {
        healthCareMembers: true,
        fitpassMembers: true,
      },
    });
  }

  async findOneEmployee(id: string) {
    return this.prisma.employee.findUnique({
      where: { id },
      include: {
        healthCareMembers: true,
        fitpassMembers: true,
      },
    });
  }
}
