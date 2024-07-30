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
