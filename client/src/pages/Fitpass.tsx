import { useEffect, useState } from "react";
import PageHeading from "../components/common/PageHeading";
import { GET_EMPLOYEES } from "../graphql/employee";
import { useQuery } from "@apollo/client";
import { Employee } from "../types/common";
import { generateFitpassMemberConstants, getNonFitpassMembers, getTotalFitpassMembers } from "../utils/getFitpassStats";
import BenefitChartCategories from "../components/benefits/BenefitChartCategories";
import BenefitChartNumbers from "../components/benefits/BenefitChartNumbers";

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
  const employeeWithoutFitpass = getNonFitpassMembers(employees);

  return (
    <>
      <PageHeading title="Fitpass" />

      {employees.length > 0 && (
        <div className="flex flex-col items-center my-8 justify-evenly lg:flex-row ">
          <BenefitChartCategories
            categoryData={fitpassMemberConstants}
            totalMembers={totalFitpassMembers}
            title="Fitpass Membership Categories"
            description="Chart showing fitpass members distribution across different categories"
          />
          <BenefitChartNumbers
            employeesTotal={employees.length}
            employeeWithoutBenefit={employeeWithoutFitpass}
            title="Fitpass Employees Membership"
            description="Chart showing employees with fitpass and without fitpass membership"
          />
        </div>
      )}
    </>
  );
}
