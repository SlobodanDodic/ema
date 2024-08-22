import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title } from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { barChartOptions } from "../../utils/chartUtils";
import { bgColors } from "../benefits/chartColors";
import { ChartProps } from "../../types/chartTypes";

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title, ChartDataLabels);

export default function BarChart({ categoryData, total, title, description, side }: ChartProps) {
  const categoryLabels = Object.keys(categoryData);
  const categoryValues = Object.values(categoryData);

  const barData = {
    labels: categoryLabels,
    datasets: [
      {
        data: categoryValues,
        backgroundColor: bgColors,
      },
    ],
  };

  const chartOptions = barChartOptions(total, side || "bottom");

  return (
    <div className="w-full max-w-lg border-b-2 lg:ps-7 border-marine/10">
      <h1 className="font-semibold text-marine">{title}</h1>
      <h3 className="mt-2 mb-6 font-medium text-ash">{description}</h3>
      <Bar id="bar-chart" data={barData} options={chartOptions} />
    </div>
  );
}
