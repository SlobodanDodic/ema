import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title } from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { bgColors } from "./chartColors";
import { BenefitChartCategoriesProps } from "../../types/benefitTypes";
import { doughnutChartOptions } from "../../utils/chartUtils";

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title, ChartDataLabels);

export default function BenefitChartCategories({ categoryData, totalMembers, title, description }: BenefitChartCategoriesProps) {
  const categoryLabels = Object.keys(categoryData);
  const categoryValues = Object.values(categoryData);

  const doughnutData = {
    labels: categoryLabels,
    datasets: [
      {
        data: categoryValues,
        backgroundColor: bgColors,
      },
    ],
  };

  return (
    <div className="w-full max-w-lg lg:border-s-2 lg:ps-7 lg:border-marine/50">
      <h1 className="font-semibold text-marine">{title}</h1>
      <h3 className="mt-2 -mb-6 font-medium text-ash">{description}</h3>
      <Doughnut id="doughnut-chart" data={doughnutData} options={doughnutChartOptions(totalMembers)} />
    </div>
  );
}
