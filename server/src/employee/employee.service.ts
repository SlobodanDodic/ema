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

    // Transform the jobTitleCounts object into an array of JobTitles objects
    const result = Object.entries(jobTitleCounts).map(([jobTitle, count]) => ({
      jobTitle,
      count,
      totalEmployees,
    }));

    return result; // Return an array
  }
}
