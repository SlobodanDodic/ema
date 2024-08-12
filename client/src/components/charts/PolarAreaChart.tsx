import { PolarArea } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  RadialLinearScale,
} from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { polarAreaChartOptions } from "../../utils/chartUtils";
import { bgColors } from "../benefits/chartColors";

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, RadialLinearScale, BarElement, Title, ChartDataLabels);

interface PolarAreaChartProps {
  categoryData: { [key: string]: number };
  total: number;
  title: string;
  description: string;
}

export default function PolarAreaChart({ categoryData, total, title, description }: PolarAreaChartProps) {
  const categoryLabels = Object.keys(categoryData);
  const categoryValues = Object.values(categoryData);

  const polarAreaData = {
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
      <PolarArea id="polarArea-chart" data={polarAreaData} options={polarAreaChartOptions(total)} />
    </div>
  );
}
