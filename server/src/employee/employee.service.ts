import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { EmployeeInput } from './dto/employee.input';
import { BenefitService } from 'src/benefit/benefit.service';
import { LiabilityService } from 'src/liability/liability.service';

@Injectable()
export class EmployeeService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly benefitService: BenefitService,
    private readonly liabilityService: LiabilityService,
  ) {}

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
        cumulativeLiabilities: 0,
        lastCalculation: new Date(),
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
        cumulativeLiabilities: 0,
        lastCalculation: new Date(),
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

  async getAllEmployees() {
    return this.prisma.employee.findMany({
      include: {
        healthCareMembers: {
          include: {
            employee: true,
          },
        },
        fitpassMembers: {
          include: {
            employee: true,
          },
        },
      },
    });
  }

  async getOneEmployee(employeeId: string) {
    const employee = await this.prisma.employee.findUnique({
      where: { id: employeeId },
      include: {
        healthCareMembers: {
          include: {
            employee: true,
          },
        },
        fitpassMembers: {
          include: {
            employee: true,
          },
        },
      },
    });

    if (!employee) {
      throw new Error(`Employee with id ${employeeId} not found`);
    }

    const healthCareMembersCount = employee.healthCareMembers.length;
    const fitpassMembersCount = employee.fitpassMembers.length;
    const hasEmployeeCategory =
      employee.healthCareMembers.some(
        (member) => member.category === 'Employee',
      ) ||
      employee.fitpassMembers.some((member) => member.category === 'Employee');

    console.log(
      'Healthcare Members Count:',
      healthCareMembersCount,
      'Fitpass Members Count:',
      fitpassMembersCount,
      'Has Employee Category:',
      hasEmployeeCategory,
    );

    return {
      ...employee,
      healthCareMembersCount,
      fitpassMembersCount,
      hasEmployeeCategory,
    };
  }

  async checkAndPerformCalculation() {
    const today = new Date();
    const firstOfMonth = new Date(today.getFullYear(), today.getMonth(), 7);

    const employees = await this.getAllEmployees();

    await Promise.all(
      employees.map(async (employee) => {
        try {
          if (
            !employee.lastCalculation ||
            employee.lastCalculation < firstOfMonth
          ) {
            const healthCareMembers =
              await this.benefitService.getHealthcareMembersByEmployee(
                employee.id,
              );
            const fitpassMembers =
              await this.benefitService.getFitpassMembersByEmployee(
                employee.id,
              );

            const employeeLiabilities = {
              ...employee,
              healthCareMembers,
              fitpassMembers,
            };

            const totalPrice =
              await this.liabilityService.calculateEmployeeLiabilities(
                employeeLiabilities,
              );

            await this.liabilityService.updateLiabilities(
              employee.id,
              totalPrice,
            );
          }
        } catch (error) {
          console.error(`Error processing employee ${employee.id}:`, error);
        }
      }),
    );
  }
}
