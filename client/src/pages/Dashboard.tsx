import PageHeading from "../components/common/PageHeading";
import EmployeeHealthStats from "../components/dashboard/EmployeeHealthStats";
import EmployeeFitpassStats from "../components/dashboard/EmployeeFitpassStats";
import JobTitleCounts from "../components/dashboard/JobTitleCounts";

export default function Dashboard() {
  return (
    <>
      <PageHeading title="Dashboard" />

      <div className="flex flex-col items-center justify-center mx-auto my-6 lg:flex-row lg:justify-start">
        <JobTitleCounts />
        <EmployeeHealthStats />
        <EmployeeFitpassStats />
      </div>
    </>
  );
}
