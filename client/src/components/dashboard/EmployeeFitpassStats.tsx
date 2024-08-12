import { useQuery } from "@apollo/client";
import { GET_EMPLOYEES_FITPASS_STATS } from "../../graphql/employee";
import DoughnutChart from "../charts/DoughnutChart";
import Loading from "../../pages/Loading";

export default function EmployeeFitpassStats() {
  const { data: employeesData, loading, error } = useQuery(GET_EMPLOYEES_FITPASS_STATS);

  if (loading) return <Loading />;
  if (error) return <p>Error: {error.message}</p>;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { __typename, totalEmployees, ...employeeFitpassStats } = employeesData?.getEmployeesFitpassStats || {};

  return (
    <DoughnutChart
      categoryData={employeeFitpassStats}
      total={totalEmployees}
      title="Employee Fitpass Stats"
      description="Procentage of employees using Fitpass or without Fitpass"
    />
  );
}
