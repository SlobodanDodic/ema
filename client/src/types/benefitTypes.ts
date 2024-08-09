export type BenefitType = {
  id: string;
  value: string;
  price: number;
  employeeDiscount: number;
};

// client/src/components/benefits/BenefitChartCategories.tsx
export interface BenefitChartCategoriesProps {
  categoryData: { [key: string]: number };
  totalMembers: number;
  title: string;
  description: string;
}

// client/src/components/benefits/BenefitChartNumbers.tsx
export interface BenefitChartNumbersProps {
  employeesTotal: number;
  employeeWithoutBenefit: number;
  title: string;
  description: string;
}
