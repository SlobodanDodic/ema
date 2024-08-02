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
  insuranceCompanies: Benefit[];
  paymentData: { getAllPayments: Payment[] };
  onClick: (employee: Employee) => void;
  calculateTotalPrice: (employee: Employee, insuranceCompanies: Benefit[]) => number;
};

export type PaymentsEntryModalProps = {
  employee: Employee;
  toggleModal: () => void;
};

export type Benefit = {
  value: string;
  price: number;
  employeeDiscount: number;
};

export type Benefits = {
  insurances: Benefit[];
  fitpass: Benefit[];
};
