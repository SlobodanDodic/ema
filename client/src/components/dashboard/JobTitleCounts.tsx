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

  const getJobTitleCountsObject = jobTitleCounts?.getJobTitleCounts.reduce(
    (acc: { [x: string]: number }, curr: { jobTitle: string; count: number }) => {
      acc[curr.jobTitle] = curr.count;
      return acc;
    },
    {}
  );

  return (
    <DoughnutChart
      categoryData={getJobTitleCountsObject}
      total={totalEmployees}
      title="Employees by Job Title"
      description="Percentage of employees by job title"
    />
  );
}
