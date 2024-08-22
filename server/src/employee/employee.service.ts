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

  async getEmployeesHealthcareStats() {
    const employees = await this.prisma.employee.findMany({
      include: {
        healthCareMembers: true,
      },
    });

    let mediGroupEmployees = 0;
    let ddorEmployees = 0;

    employees.forEach((employee) => {
      const employeeMediGroupMembers = employee.healthCareMembers.filter(
        (member) =>
          member.category === 'Employee' && member.insurance === 'MediGroup',
      );
      mediGroupEmployees += employeeMediGroupMembers.length;

      const employeeDDORMembers = employee.healthCareMembers.filter(
        (member) =>
          member.category === 'Employee' && member.insurance === 'DDOR',
      );
      ddorEmployees += employeeDDORMembers.length;
    });

    const totalEmployees = employees.length;
    const WithoutHC = totalEmployees - mediGroupEmployees - ddorEmployees;

    return {
      MediGroup: mediGroupEmployees,
      DDOR: ddorEmployees,
      WithoutHC,
      totalEmployees,
    };
  }

  async getEmployeesFitpassStats() {
    const employees = await this.prisma.employee.findMany({
      include: {
        fitpassMembers: true,
      },
    });

    let fitpassEmployees = 0;

    employees.forEach((employee) => {
      const employeeFitpassMembers = employee.fitpassMembers.filter(
        (member) => member.category === 'Employee',
      );
      fitpassEmployees += employeeFitpassMembers.length;
    });

    const totalEmployees = employees.length;
    const Without = totalEmployees - fitpassEmployees;

    return { Fitpass: fitpassEmployees, Without, totalEmployees };
  }

  async getJobTitleCounts() {
    const employees = await this.prisma.employee.findMany();

    const jobTitleCounts: { [key: string]: number } = {};
    const totalEmployees = employees.length;

    employees.forEach((employee) => {
      const jobTitle: string | undefined = employee.jobTitle;

      if (jobTitle) {
        if (jobTitleCounts[jobTitle]) {
          jobTitleCounts[jobTitle] += 1;
        } else {
          jobTitleCounts[jobTitle] = 1;
        }
      }
    });

    const getJobTitleCounts = Object.entries(jobTitleCounts).map(
      ([jobTitle, count]) => ({
        jobTitle,
        count,
      }),
    );

    return { totalEmployees, getJobTitleCounts };
  }

  async getFitpassCategories() {
    const employees = await this.prisma.employee.findMany({
      include: {
        fitpassMembers: true,
      },
    });

    const fitpassCategoryCounts: { [key: string]: number } = {};
    let totalMembers = 0;

    employees.forEach((employee) => {
      employee.fitpassMembers.forEach((member) => {
        if (fitpassCategoryCounts[member.category]) {
          fitpassCategoryCounts[member.category] += 1;
        } else {
          fitpassCategoryCounts[member.category] = 1;
        }
        totalMembers += 1;
      });
    });

    let employeeCount = 0;
    let nonEmployeeCount = 0;

    Object.entries(fitpassCategoryCounts).forEach(([category, count]) => {
      if (category === 'Employee') {
        employeeCount += count;
      } else {
        nonEmployeeCount += count;
      }
    });

    const aggregatedFitpassCounts = [
      { category: 'Employee', count: employeeCount },
      { category: 'Non-Employee', count: nonEmployeeCount },
    ];

    const getFitpassAllCounts = Object.entries(fitpassCategoryCounts).map(
      ([category, count]) => ({
        category,
        count,
      }),
    );

    return {
      totalMembers,
      getFitpassCounts: aggregatedFitpassCounts,
      getFitpassAllCounts,
    };
  }

  async getHealthcareCategories() {
    const employees = await this.prisma.employee.findMany({
      include: {
        healthCareMembers: true,
      },
    });

    const healthcareCategoryCounts: { [key: string]: number } = {};
    const healthcareInsuranceCounts: { [key: string]: number } = {};
    let totalMembers = 0;

    employees.forEach((employee) => {
      employee.healthCareMembers.forEach((member) => {
        // Count by category
        if (healthcareCategoryCounts[member.category]) {
          healthcareCategoryCounts[member.category] += 1;
        } else {
          healthcareCategoryCounts[member.category] = 1;
        }

        // Count by insurance
        if (member.insurance) {
          if (healthcareInsuranceCounts[member.insurance]) {
            healthcareInsuranceCounts[member.insurance] += 1;
          } else {
            healthcareInsuranceCounts[member.insurance] = 1;
          }
        }

        totalMembers += 1;
      });
    });

    // Aggregate Employee and Non-Employee counts
    let employeeCount = 0;
    let nonEmployeeCount = 0;

    Object.entries(healthcareCategoryCounts).forEach(([category, count]) => {
      if (category === 'Employee') {
        employeeCount += count;
      } else {
        nonEmployeeCount += count;
      }
    });

    const aggregatedHealthcareCounts = [
      { category: 'Employee', count: employeeCount },
      { category: 'Non-Employee', count: nonEmployeeCount },
    ];

    const healthcareInsuranceCountsArray = Object.entries(
      healthcareInsuranceCounts,
    ).map(([insurance, count]) => ({
      category: insurance,
      count,
    }));

    const getHealthcareAllCounts = Object.entries(healthcareCategoryCounts).map(
      ([category, count]) => ({
        category,
        count,
      }),
    );

    return {
      totalMembers,
      getHealthcareCounts: aggregatedHealthcareCounts,
      getHealthcareInsurances: healthcareInsuranceCountsArray,
      getHealthcareAllCounts,
    };
  }
}
