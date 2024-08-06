import { Injectable } from '@nestjs/common';
import { Benefit } from 'src/benefit/entities/benefit.entity';
import { FitpassMember } from 'src/employee/entities/fitpass.entity';
import { HealthCareMember } from 'src/employee/entities/healthcare.entity';

type Employee = {
  cumulativeLiabilities?: number;
  healthCareMembers: HealthCareMember[];
  fitpassMembers: FitpassMember[];
};

@Injectable()
export class CalculationService {
  calculateTotalPrice(
    employee: Employee,
    healthcare: Benefit[],
    fitpass: Benefit[],
  ): number {
    let total = 0;

    healthcare.forEach((company: Benefit) => {
      const memberCount = employee.healthCareMembers.filter(
        (member) => member.insurance === company.value,
      ).length;
      const employeeMemberCount = employee.healthCareMembers.filter(
        (member) =>
          member.category === 'Employee' && member.insurance === company.value,
      ).length;

      const discount = employeeMemberCount > 0 ? company.employeeDiscount : 0;
      const amountToAdd = company.price * memberCount - discount;
      total += amountToAdd;
    });

    const fitpassTotalMembers = employee.fitpassMembers.length;
    const fitpassEmployeeCount = employee.fitpassMembers.filter(
      (member) => member.category === 'Employee',
    ).length;
    const fitpassTotal =
      fitpassTotalMembers * fitpass[0].price -
      fitpassEmployeeCount * fitpass[0].employeeDiscount;

    total += fitpassTotal;
    return total;
  }
}
