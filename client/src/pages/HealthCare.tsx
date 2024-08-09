import { useEffect, useState } from "react";
import PageHeading from "../components/common/PageHeading";
import { GET_EMPLOYEES } from "../graphql/employee";
import { useQuery } from "@apollo/client";
import { Employee } from "../types/common";
import {
  generateHealthcareInsuranceConstants,
  generateHealthcareMemberConstants,
  getTotalHealthcareMembers,
} from "../utils/getHealthcareStats";
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
  const employeeWithHelathcare = healthcareMemberConstants["Employee"] || 0;

  const employeeWithDDOR = generateHealthcareInsuranceConstants(employees)["DDOR"] || 0;
  const employeeWithMediGroup = generateHealthcareInsuranceConstants(employees)["MediGroup"] || 0;
  const totalEmployeesWithHealthcare = employeeWithDDOR + employeeWithMediGroup;

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
            employeeWithBenefit={employeeWithHelathcare}
            title="Healthcare Employees Membership"
            description="Chart showing employees with healthcare and without healthcare membership"
          />
          <BenefitChartNumbers
            employeesTotal={totalEmployeesWithHealthcare}
            employeeWithBenefit={employeeWithDDOR}
            insurance="DDOR"
            title="Healthcare Insurance Companies"
            description="Chart showing employees with different healthcare insurance companies"
          />
        </div>
      )}
    </>
  );
}
