import { useEffect, useState } from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title } from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { doughnutChartOptions } from "../../utils/chartUtils";
import { bgColors } from "../benefits/chartColors";
import { ChartProps } from "../../types/chartTypes";
import { getLegendPosition } from "../../utils/getLegendPosition";

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title, ChartDataLabels);

export default function DoughnutChart({ categoryData, title, description, total }: ChartProps) {
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

  const doughnutData = {
    labels: categoryLabels,
    datasets: [
      {
        data: categoryValues,
        backgroundColor: bgColors,
      },
    ],
  };

  const chartOptions = doughnutChartOptions(total, legendPosition);

  return (
    <div className="w-full max-w-lg p-4 mb-10 mr-8 border-b-2 lg:mb-4 lg:border-b-0 lg:border-s-2 lg:ps-7 lg:border-marine/50">
      <h1 className="font-semibold text-marine">{title}</h1>
      <h3 className="mt-2 mb-6 font-medium text-ash">{description}</h3>
      <Doughnut id="doughnut-chart" data={doughnutData} options={chartOptions} />
    </div>
  );
}
