import { Employee } from "../types/common";

// Function to get the total number of Healthcare members
export const getTotalHealthcareMembers = (employees: Employee[]): number => {
  return employees.reduce((total, employee) => total + employee.healthCareMembers.length, 0);
};

// Function to get the number of each category of Healthcare members and dynamically create constants for each category
export const getHealthcareMembersByCategory = (employees: Employee[]): { [key: string]: number } => {
  const categoryCounts: { [key: string]: number } = {};

  employees.forEach((employee) => {
    employee.healthCareMembers.forEach((member) => {
      categoryCounts[member.category] = (categoryCounts[member.category] || 0) + 1;
    });
  });

  return categoryCounts;
};

// Function to get the total number of employees that are not Healthcare members
export const getNonHealthCareMembers = (employees: Employee[]): number => {
  return employees.reduce((total, employee) => total + (employee.healthCareMembers.length === 0 ? 1 : 0), 0);
};

// Usage of dynamically created constants
export const generateHealthcareMemberConstants = (employees: Employee[]) => {
  const categoryCounts = getHealthcareMembersByCategory(employees);
  const constants = {} as { [key: string]: number };

  for (const category in categoryCounts) {
    constants[`${category}`] = categoryCounts[category];
  }

  return constants;
};
