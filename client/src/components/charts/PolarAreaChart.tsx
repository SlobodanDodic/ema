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
import { ChartProps } from "../../types/chartTypes";
import { useEffect, useState } from "react";
import { getLegendPosition } from "../../utils/getLegendPosition";

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, RadialLinearScale, BarElement, Title, ChartDataLabels);

export default function PolarAreaChart({ categoryData, total, title, description }: ChartProps) {
  const categoryLabels = Object.keys(categoryData);
  const categoryValues = Object.values(categoryData);

  const [legendPosition, setLegendPosition] = useState<"left" | "bottom">(getLegendPosition());

  useEffect(() => {
    const handleResize = () => {
      setLegendPosition(getLegendPosition());
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const polarAreaData = {
    labels: categoryLabels,
    datasets: [
      {
        data: categoryValues,
        backgroundColor: bgColors,
      },
    ],
  };

  const chartOptions = polarAreaChartOptions(total, legendPosition);

  return (
    <div className="w-full max-w-lg p-4 mb-10 border-b-2 lg:ps-7 border-marine/10">
      <h1 className="font-semibold text-marine">{title}</h1>
      <h3 className="mt-2 mb-6 font-medium text-ash">{description}</h3>
      <PolarArea id="polarArea-chart" data={polarAreaData} options={chartOptions} />
    </div>
  );
}
