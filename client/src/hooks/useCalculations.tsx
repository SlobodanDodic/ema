import { useCallback } from "react";
import { Employee } from "../types/common";
import { BenefitType } from "../types/benefitTypes";

export const useCalculations = (healthcare: BenefitType[], fitpass: BenefitType[]) => {
  const fitpassPrice = fitpass?.[0]?.price;

  const calculateTotalPrice = useCallback(
    (employee: Employee): number => {
      let total = 0;

      healthcare?.forEach((company: BenefitType) => {
        const memberCount = employee.healthCareMembers.filter((member) => member.insurance === company.value).length;
        const discount = employee.healthCareMembers.some(
          (member) => member.category === "Employee" && member.insurance === company.value
        )
          ? company.employeeDiscount
          : 0;

        const amountToAdd = company.price * memberCount - discount;
        total += amountToAdd;
      });

      const fitpassTotalMembers = employee.fitpassMembers.length;
      const discount = employee.fitpassMembers.filter((member) => member.category === "Employee").length;
      const fitpassTotal = fitpassTotalMembers * fitpassPrice - discount * fitpass?.[0]?.employeeDiscount;

      total += fitpassTotal;
      return total;
    },
    [fitpass, fitpassPrice, healthcare]
  );

  const calculateMonthlyObligation = useCallback(
    (employees: Employee[]) => {
      const today = new Date();
      const isFirstOfMonth = today.getDate() === 1;

      if (isFirstOfMonth) {
        console.log("The 1st of the month. Calculation performed.");

        employees.forEach((employee) => {
          const totalAmount = calculateTotalPrice(employee);
          console.log(`Total Amount for employee ${employee.fullName} on ${today.toDateString()}: ${totalAmount}`);
        });
      } else {
        console.log("Not the 1st of the month. Calculation not performed.");
      }
    },
    [calculateTotalPrice]
  );

  return { calculateTotalPrice, calculateMonthlyObligation };
};
