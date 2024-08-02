import { Employee } from "./common";

export type PaymentsTableProps = {
  employees: Employee[];
  visibleColumns: Record<string, boolean>;
};

export type Payment = {
  id: string;
  amount: number;
  entryDate: Date;
  employeeId: string;
  employee: Employee;
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
