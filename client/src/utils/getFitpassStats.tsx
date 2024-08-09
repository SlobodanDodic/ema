import { Employee } from "../types/common";

// Function to get the total number of Fitpass members
export const getTotalFitpassMembers = (employees: Employee[]): number => {
  return employees.reduce((total, employee) => total + employee.fitpassMembers.length, 0);
};

// Function to get the number of each category of Fitpass members and dynamically create constants for each category
export const getFitpassMembersByCategory = (employees: Employee[]): { [key: string]: number } => {
  const categoryCounts: { [key: string]: number } = {};

  employees.forEach((employee) => {
    employee.fitpassMembers.forEach((member) => {
      categoryCounts[member.category] = (categoryCounts[member.category] || 0) + 1;
    });
  });

  return categoryCounts;
};

// Function to get the total number of employees that are not Fitpas members:
export const getNonFitpassMembers = (employees: Employee[]): number => {
  return employees.reduce((total, employee) => total + (employee.fitpassMembers.length === 0 ? 1 : 0), 0);
};

// Usage of dynamically created constants
export const generateFitpassMemberConstants = (employees: Employee[]) => {
  const categoryCounts = getFitpassMembersByCategory(employees);
  const constants = {} as { [key: string]: number };

  for (const category in categoryCounts) {
    constants[`${category}`] = categoryCounts[category];
  }

  return constants;
};
