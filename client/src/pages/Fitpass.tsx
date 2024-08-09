import { useEffect, useState } from "react";
import PageHeading from "../components/common/PageHeading";
import { GET_EMPLOYEES } from "../graphql/employee";
import { useQuery } from "@apollo/client";
import { Employee } from "../types/common";
import { generateFitpassMemberConstants, getTotalFitpassMembers } from "../utils/getFitpassStats";
import FitpassCharts from "../components/fitpass/FitpassCharts";

export default function Fipass() {
  const { data } = useQuery(GET_EMPLOYEES);
  const [employees, setEmployees] = useState<Employee[]>([]);

  useEffect(() => {
    if (data) {
      setEmployees(data?.getAllEmployees);
    }
  }, [data]);

  const totalFitpassMembers = getTotalFitpassMembers(employees);
  const fitpassMemberConstants = generateFitpassMemberConstants(employees);

  // for (const [key, value] of Object.entries(fitpassMemberConstants)) {
  //   console.log(`${key}: ${value}`);
  // }

  return (
    <>
      <PageHeading title="Fitpass" />

      {employees.length > 0 && (
        <FitpassCharts
          employeesTotal={employees.length}
          fitpassTotal={totalFitpassMembers}
          categoryData={fitpassMemberConstants}
        />
      )}
    </>
  );
}
