import { Employee } from "./common";

export type PaymentsTableProps = {
  employees: Employee[];
  visibleColumns: Record<string, boolean>;
  handleRowClick: () => void;
};

export type PaymentDetailsProps = {
  employees: Employee[];
  handleRowClick: () => void;
};
