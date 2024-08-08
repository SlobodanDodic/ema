import { Member } from "./formTypes";

// client/src/pages/Employees.tsx
export type Employee = {
  id: string;
  fullName: string;
  jobTitle?: string;
  phoneNumber?: string;
  birthday?: Date | null;
  contract?: Date | null;
  eyes?: Date | null;
  safety?: Date | null;
  fire?: Date | null;
  firstAid?: Date | null;
  healthCareMembers: Member[];
  fitpassMembers: Member[];
  createdAt: Date;
  updatedAt: Date;
};
