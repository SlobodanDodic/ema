import { Employee } from "./common";

export type PaymentsTableProps = {
  employees: Employee[];
  visibleColumns: Record<string, boolean>;
};
