import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title } from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { doughnutChartOptions } from "../../utils/chartUtils";
import { bgColors } from "../benefits/chartColors";

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title, ChartDataLabels);

interface DoughnutChartProps {
  categoryData: { [key: string]: number };
  total: number;
  title: string;
  description: string;
}

export default function DoughnutChart({ categoryData, total, title, description }: DoughnutChartProps) {
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
      <Doughnut id="doughnut-chart" data={doughnutData} options={doughnutChartOptions(total)} />
    </div>
  );
}
