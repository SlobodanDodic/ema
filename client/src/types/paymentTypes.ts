import { BenefitType } from "./benefitTypes";
import { Employee } from "./common";

export type Payment = {
  id: string;
  amount: number;
  entryDate: Date;
  employeeId: string;
  employee: Employee;
};

export type PaymentsTableProps = {
  employees: Employee[];
  visibleColumns: Record<string, boolean>;
};

export type PaymentsTableRowProps = {
  employee: Employee;
  visibleColumns: { [key: string]: boolean };
  insuranceCompanies: BenefitType[];
  onClick: (employee: Employee) => void;
  calculateTotalPrice: (employee: Employee, insuranceCompanies: BenefitType[]) => number;
};

export type PaymentsEntryModalProps = {
  employee: Employee;
  toggleModal: () => void;
};
