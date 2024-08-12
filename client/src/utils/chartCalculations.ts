import { Employee } from "../types/common";

export function calculateJobTitleCounts(employees: Employee[]) {
  const jobTitleCounts: { [key: string]: number } = {};

  employees.forEach((employee) => {
    const jobTitle: string | undefined = employee.jobTitle;

    if (jobTitle) {
      if (jobTitleCounts[jobTitle]) {
        jobTitleCounts[jobTitle] += 1;
      } else {
        jobTitleCounts[jobTitle] = 1;
      }
    }
  });

  return jobTitleCounts;
}
