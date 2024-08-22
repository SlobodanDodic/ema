import PageHeading from "../components/common/PageHeading";
import { GET_ALL_FITPASS_STATS } from "../graphql/employee";
import { useQuery } from "@apollo/client";
import DoughnutChart from "../components/charts/DoughnutChart";
import Loading from "./Loading";
import { NoData } from "../components/common/NoData";

export default function Fipass() {
  const { data: fitpassData, loading, error } = useQuery(GET_ALL_FITPASS_STATS);

  if (loading) return <Loading />;
  if (error) return <p>Error: {error.message}</p>;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { __typename, ...getFitpassData } = fitpassData?.getFitpassCategories || {};

  const { totalMembers, getFitpassCounts, getFitpassAllCounts } = getFitpassData;

  const fitpassMemberConstants = getFitpassCounts?.reduce(
    (acc: { [x: string]: number }, curr: { category: string; count: number }) => {
      acc[curr.category] = curr.count;
      return acc;
    },
    {}
  );

  const categorizedCounts = getFitpassAllCounts?.reduce(
    (acc: { [x: string]: number }, curr: { category: string; count: number }) => {
      acc[curr.category] = curr.count;
      return acc;
    },
    {}
  );

  return (
    <>
      <PageHeading title="Fitpass" />

      {totalMembers > 0 ? (
        <div className="flex flex-col items-center my-8 justify-evenly lg:flex-row lg:flex-wrap">
          <DoughnutChart
            categoryData={fitpassMemberConstants}
            total={totalMembers}
            title="Fitpass Membership Categories"
            description="Chart showing fitpass members distribution across different categories"
          />
          <DoughnutChart
            categoryData={categorizedCounts}
            total={totalMembers}
            title="Fitpass Members by Category"
            description="Chart showing employees and non-employees with fitpass membership"
          />
        </div>
      ) : (
        <NoData
          title="No Members Found"
          message="There are currently no member records in the database."
          additionalMessage="Please visit the employee form page to add new employee or employees page to edit existing employee."
        />
      )}
    </>
  );
}
