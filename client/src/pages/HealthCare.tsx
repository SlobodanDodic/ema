import { useEffect, useState } from "react";
import PageHeading from "../components/common/PageHeading";
import { GET_EMPLOYEES } from "../graphql/employee";
import { useQuery } from "@apollo/client";
import { Employee } from "../types/common";
import { generateHealthcareMemberConstants, getTotalHealthcareMembers } from "../utils/getHealthcareStats";
import BenefitChartCategories from "../components/benefits/BenefitChartCategories";
import BenefitChartNumbers from "../components/benefits/BenefitChartNumbers";

export default function HealtCare() {
  const { data } = useQuery(GET_EMPLOYEES);
  const [employees, setEmployees] = useState<Employee[]>([]);

  useEffect(() => {
    if (data) {
      setEmployees(data?.getAllEmployees);
    }
  }, [data]);

  const totalHealthcareMembers = getTotalHealthcareMembers(employees);
  const healthcareMemberConstants = generateHealthcareMemberConstants(employees);
  const employeeWithoutBenefit = healthcareMemberConstants["Employee"] || 0;

  return (
    <>
      <PageHeading title="Health Care" />

      {employees.length > 0 && (
        <div className="flex flex-col items-center my-8 justify-evenly lg:flex-row ">
          <BenefitChartCategories
            categoryData={healthcareMemberConstants}
            totalMembers={totalHealthcareMembers}
            title="Healthcare Membership Categories"
            description="Chart showing healthcare members distribution across different categories"
          />
          <BenefitChartNumbers
            employeesTotal={employees.length}
            employeeWithoutBenefit={employeeWithoutBenefit}
            title="Healthcare Employees Membership"
            description="Chart showing employees with healthcare and without healthcare membership"
          />
        </div>
      )}
    </>
  );
}
