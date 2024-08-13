import PageHeading from "../components/common/PageHeading";
import { GET_ALL_HEALTHCARE_STATS } from "../graphql/employee";
import { useQuery } from "@apollo/client";
import DoughnutChart from "../components/charts/DoughnutChart";
import Loading from "./Loading";

export default function HealtCare() {
  const { data: heathData, loading, error } = useQuery(GET_ALL_HEALTHCARE_STATS);

  if (loading) return <Loading />;
  if (error) return <p>Error: {error.message}</p>;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { __typename, ...getHealthcareData } = heathData?.getHealthcareCategories || {};

  const { totalMembers, getHealthcareCounts, getHealthcareInsurances, getHealthcareAllCounts } = getHealthcareData;

  const categorizedCounts = getHealthcareCounts?.reduce(
    (acc: { [x: string]: number }, curr: { category: string; count: number }) => {
      acc[curr.category] = curr.count;
      return acc;
    },
    {}
  );

  const healthcareMemberConstants = getHealthcareAllCounts?.reduce(
    (acc: { [x: string]: number }, curr: { category: string; count: number }) => {
      acc[curr.category] = curr.count;
      return acc;
    },
    {}
  );

  const healthCareInsurances = getHealthcareInsurances?.reduce(
    (acc: { [x: string]: number }, curr: { category: string; count: number }) => {
      acc[curr.category] = curr.count;
      return acc;
    },
    {}
  );

  const totalInsurances = (Object.values(healthCareInsurances) as number[]).reduce((sum, count) => sum + count, 0);

  return (
    <>
      <PageHeading title="Health Care" />
      {totalMembers && (
        <div className="grid grid-cols-1 my-8 justify-items-center lg:grid-cols-2 2xl:grid-cols-3">
          <DoughnutChart
            categoryData={healthcareMemberConstants}
            total={totalMembers}
            title="Healthcare Membership Categories"
            description="Chart showing healthcare members distribution across different categories"
          />
          <DoughnutChart
            categoryData={healthCareInsurances}
            total={totalInsurances}
            title="Healthcare Insurance Companies"
            description="Chart showing users of all different healthcare insurance companies"
          />
          <DoughnutChart
            categoryData={categorizedCounts}
            total={totalInsurances}
            title="Healthcare Members by Category"
            description="Chart showing employees and non-employees with healthcare membership"
          />
        </div>
      )}
    </>
  );
}
