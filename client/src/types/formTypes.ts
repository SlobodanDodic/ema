import { BenefitType } from "./benefitTypes";

// client/src/pages/Form.tsx
export type FormData = {
  birthday: Date | null;
  contract: Date | null;
  phoneNumber: string;
  eyes: Date | null;
  safety: Date | null;
  fire: Date | null;
  firstAid: Date | null;
  fullName: string;
  jobTitle: string;
  healthCareMembers: Member[];
  fitpassMembers: Member[];
};

export interface Member {
  id: string;
  name: string;
  category: string;
  insurance: string;
  start: Date | null;
  end: Date | null;
}

// client/src/components/form/InputDate.tsx
export type InputDateProps = {
  selected: Date | null;
  setSelected: (date: Date | null) => void;
  name?: string;
  minDate?: Date;
  maxDate?: Date;
};

// client/src/components/form/InputText.tsx
export type InputTextProps = {
  name: string;
  label: string;
  value: string;
  type?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

// client/src/components/form/InputWellness.tsx
export interface InputMembersProps {
  beneficiary: string;
  title: string;
  members: Member[];
  setMembers: (members: Member[]) => void;
  icon: JSX.Element;
}

// client/src/components/form/InputSelect.tsx
export interface Option {
  value: string;
}
export interface JobOption {
  id: string;
  value: string;
}

export interface SelectProps {
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: (Option | BenefitType | JobOption)[];
  className?: string;
  placeholder?: string;
}

// client/src/components/form/MembersTable.tsx
export interface MembersTableProps {
  title: string;
  members: Member[];
  handleEditMember: (member: Member) => void;
  handleDeleteMember: (id: string) => void;
}
