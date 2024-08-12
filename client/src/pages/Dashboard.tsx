import { useQuery } from "@apollo/client";
import PageHeading from "../components/common/PageHeading";
import { GET_EMPLOYEE_JOB_AND_MEMBERS } from "../graphql/employee";
import { calculateJobTitleCounts } from "../utils/chartCalculations";
import EmployeeHealthStats from "../components/dashboard/EmployeeHealthStats";
import EmployeeFitpassStats from "../components/dashboard/EmployeeFitpassStats";
// import JobTitleCounts from "../components/dashboard/JobTitleCounts";

export default function Dashboard() {
  const { data: employeeData, loading, error } = useQuery(GET_EMPLOYEE_JOB_AND_MEMBERS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const jobTitleCounts = calculateJobTitleCounts(employeeData?.getAllEmployees);

  console.log(jobTitleCounts);
  console.log(typeof jobTitleCounts);

  return (
    <>
      <PageHeading title="Dashboard" />

      <div className="flex flex-col items-center justify-center mx-auto my-6 lg:flex-row lg:justify-start">
        {/* <JobTitleCounts/> */}

        <EmployeeHealthStats />
        <EmployeeFitpassStats />
      </div>
    </>
  );
}
