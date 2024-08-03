import { Employee } from "./common";

export type Liability = {
  id: string;
  amount: string;
  recordedDate: Date;
  employee: Employee;
};
