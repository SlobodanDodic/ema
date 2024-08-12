import { useEffect, useState } from "react";
import PageHeading from "../components/common/PageHeading";
import { GET_EMPLOYEES } from "../graphql/employee";
import { useQuery } from "@apollo/client";
import { Employee } from "../types/common";
import { generateFitpassMemberConstants, getTotalFitpassMembers } from "../utils/getFitpassStats";
import DoughnutChart from "../components/charts/DoughnutChart";

export default function Fipass() {
  const { data } = useQuery(GET_EMPLOYEES);
  const [employees, setEmployees] = useState<Employee[]>([]);

  useEffect(() => {
    if (data) {
      setEmployees(data?.getAllEmployees);
    }
  }, [data]);

  const fitpassMemberConstants = generateFitpassMemberConstants(employees);
  const totalFitpassMembers = getTotalFitpassMembers(employees);

  const categorizedCounts = {
    employee: 0,
    nonEmployee: 0,
  };

  for (const [key, value] of Object.entries(fitpassMemberConstants)) {
    if (key === "Employee") {
      categorizedCounts.employee += value;
    } else {
      categorizedCounts.nonEmployee += value;
    }
  }

  return (
    <>
      <PageHeading title="Fitpass" />

      {employees.length > 0 && (
        <div className="flex flex-col items-center my-8 justify-evenly lg:flex-row ">
          <DoughnutChart
            categoryData={fitpassMemberConstants}
            total={totalFitpassMembers}
            title="Fitpass Membership Categories"
            description="Chart showing fitpass members distribution across different categories"
          />

          <DoughnutChart
            categoryData={categorizedCounts}
            total={totalFitpassMembers}
            title="Fitpass Members by Category"
            description="Chart showing employees and non-employees with fitpass membership"
          />
        </div>
      )}
    </>
  );
}
