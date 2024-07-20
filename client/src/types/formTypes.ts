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
  name: string;
  category: string;
  start: Date | null;
  end: Date | null;
}

// client/src/components/form/InputDate.tsx
export type InputDateProps = {
  selected: Date | null;
  setSelected: (date: Date | null) => void;
  name: string;
};

// client/src/components/form/InputText.tsx
export type InputTextProps = {
  name: string;
  label: string;
  type?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

// client/src/components/form/InputWellness.tsx
export interface InputMembersProps {
  title: string;
  members: Member[];
  setMembers: (members: Member[]) => void;
  icon: JSX.Element;
}
