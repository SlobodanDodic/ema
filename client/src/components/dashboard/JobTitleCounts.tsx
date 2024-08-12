import { useQuery } from "@apollo/client";
import { GET_JOB_TITLES } from "../../graphql/employee";
import DoughnutChart from "../charts/DoughnutChart";
import Loading from "../../pages/Loading";

export default function JobTitleCounts() {
  const { data: jobData, loading, error } = useQuery(GET_JOB_TITLES);

  if (loading) return <Loading />;
  if (error) return <p>Error: {error.message}</p>;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { __typename, totalEmployees, ...jobTitleCounts } = jobData?.getJobTitleCounts || {};

  return (
    <DoughnutChart
      categoryData={jobTitleCounts}
      total={totalEmployees}
      title="Employees by Job Title"
      description="Percentage of employees by job title"
    />
  );
}
