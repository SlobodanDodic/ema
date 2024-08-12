import { useQuery } from "@apollo/client";
import PolarAreaChart from "../components/charts/PolarAreaChart";
import PageHeading from "../components/common/PageHeading";
import { GET_EMPLOYEE_JOB_AND_MEMBERS } from "../graphql/employee";
import { Employee } from "../types/common";

export default function Dashboard() {
  const { data: employeeData } = useQuery(GET_EMPLOYEE_JOB_AND_MEMBERS);

  const jobTitleCounts: { [key: string]: number } = {};
  let totalEmployees = 0;
  let totalHealthCareMembers = 0;
  let totalFitpassMembers = 0;

  employeeData?.getAllEmployees.forEach((employee: Employee) => {
    const jobTitle: string | undefined = employee.jobTitle;
    const healthCareMembers = employee.healthCareMembers;
    const fitpassMembers = employee.fitpassMembers;

    if (jobTitle) {
      if (jobTitleCounts[jobTitle]) {
        jobTitleCounts[jobTitle] += 1;
      } else {
        jobTitleCounts[jobTitle] = 1;
      }
    }

    totalEmployees += 1;
    totalHealthCareMembers += healthCareMembers.length;
    totalFitpassMembers += fitpassMembers.length;
  });

  console.log(totalFitpassMembers, totalHealthCareMembers);

  return (
    <>
      <PageHeading title="Dashboard" />
      <div className="flex items-center justify-center w-3/4 max-w-2xl mx-auto my-6">
        <PolarAreaChart
          title="Employees by Job Title"
          description="Procentage of employees by job title"
          categoryData={jobTitleCounts}
          total={totalEmployees}
        />
      </div>
    </>
  );
}
