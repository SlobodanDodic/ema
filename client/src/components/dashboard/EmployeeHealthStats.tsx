import { useQuery } from "@apollo/client";
import { GET_EMPLOYEES_HEALTHCARE_STATS } from "../../graphql/employee";
import DoughnutChart from "../charts/DoughnutChart";
import Loading from "../../pages/Loading";

export default function EmployeeHealthStats() {
  const { data: employeesData, loading, error } = useQuery(GET_EMPLOYEES_HEALTHCARE_STATS);

  if (loading) return <Loading />;
  if (error) return <p>Error: {error.message}</p>;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { __typename, totalEmployees, ...employeeHealthStats } = employeesData?.getEmployeesHealthcareStats || {};

  return (
    <DoughnutChart
      categoryData={employeeHealthStats}
      total={totalEmployees}
      title="Employee Healthcare Stats"
      description="Procentage of employees using MediGroup, DDOR or without HC"
    />
  );
}
