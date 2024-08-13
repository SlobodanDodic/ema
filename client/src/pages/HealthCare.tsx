import { useEffect, useState } from "react";
import PageHeading from "../components/common/PageHeading";
import { GET_EMPLOYEES } from "../graphql/employee";
import { useQuery } from "@apollo/client";
import { Employee } from "../types/common";
import DoughnutChart from "../components/charts/DoughnutChart";
import {
  generateHealthcareInsuranceConstants,
  generateHealthcareMemberConstants,
  getTotalHealthcareMembers,
} from "../utils/getHealthcareStats";

export default function HealtCare() {
  const { data } = useQuery(GET_EMPLOYEES);
  const [employees, setEmployees] = useState<Employee[]>([]);

  useEffect(() => {
    if (data) {
      setEmployees(data?.getAllEmployees);
    }
  }, [data]);

  const healthcareMemberConstants = generateHealthcareMemberConstants(employees);
  const totalHealthcareMembers = getTotalHealthcareMembers(employees);

  const healthCareInsurances = generateHealthcareInsuranceConstants(employees);
  const totalInsurances = Object.values(healthCareInsurances).reduce((sum, current) => sum + current, 0);

  const categorizedCounts = {
    employee: 0,
    nonEmployee: 0,
  };

  for (const [key, value] of Object.entries(healthcareMemberConstants)) {
    if (key === "Employee") {
      categorizedCounts.employee += value;
    } else {
      categorizedCounts.nonEmployee += value;
    }
  }

  console.log(healthcareMemberConstants);
  console.log(totalHealthcareMembers);
  console.log(healthCareInsurances);
  console.log(totalInsurances);
  console.log(categorizedCounts);

  return (
    <>
      <PageHeading title="Health Care" />

      {employees.length > 0 && (
        <div className="grid grid-cols-1 my-8 justify-items-center lg:grid-cols-2 2xl:grid-cols-3">
          <DoughnutChart
            categoryData={healthcareMemberConstants}
            total={totalHealthcareMembers}
            title="Healthcare Membership Categories"
            description="Chart showing healthcare members distribution across different categories"
          />
          <DoughnutChart
            categoryData={healthCareInsurances}
            total={totalInsurances}
            title="Healthcare Insurance Companies"
            description="Chart showing users of all different healthcare insurance companies"
          />
          <DoughnutChart
            categoryData={categorizedCounts}
            total={totalInsurances}
            title="Healthcare Members by Category"
            description="Chart showing employees and non-employees with healthcare membership"
          />
        </div>
      )}
    </>
  );
}
