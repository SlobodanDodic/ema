import PageHeading from "../components/common/PageHeading";
import EmployeeHealthStats from "../components/dashboard/EmployeeHealthStats";
import EmployeeFitpassStats from "../components/dashboard/EmployeeFitpassStats";
import JobTitleCounts from "../components/dashboard/JobTitleCounts";
import { useQuery } from "@apollo/client";
import { GET_EMPLOYEES } from "../graphql/employee";
import { NoData } from "../components/common/NoData";

export default function Dashboard() {
  const { data: employees } = useQuery(GET_EMPLOYEES);

  return (
    <>
      <PageHeading title="Dashboard" />
      {!employees?.getAllEmployees || employees.getAllEmployees.length === 0 ? (
        <NoData
          title="No Employees Found"
          message="There are currently no employee records in the database."
          additionalMessage="Please visit the employee form page to add new employee information."
        />
      ) : (
        <div className="grid grid-cols-1 my-8 justify-items-center lg:grid-cols-2 2xl:grid-cols-3">
          <JobTitleCounts />
          <EmployeeHealthStats />
          <EmployeeFitpassStats />
        </div>
      )}
    </>
  );
}
