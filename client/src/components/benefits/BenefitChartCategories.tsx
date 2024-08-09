import { Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  ChartOptions,
  LegendItem,
} from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { bgColors } from "./chartColors";
import { BenefitChartCategoriesProps } from "../../types/benefitTypes";

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

  const doughnutOptions: ChartOptions<"doughnut"> = {
    plugins: {
      legend: {
        position: "left" as const,
        labels: {
          generateLabels: (chart): LegendItem[] => {
            const data = chart.data;
            if (data.labels && data.datasets.length) {
              return data.labels.map((label, i) => {
                const dataset = data.datasets[0];
                const value = dataset.data[i] as number;
                const color = dataset.backgroundColor ? (dataset.backgroundColor as string[])[i] : "#000";
                return {
                  text: `${label}: ${value}`,
                  fillStyle: color,
                  strokeStyle: color,
                  fontColor: "#124e66",
                  hidden: !chart.isDatasetVisible(0),
                  index: i,
                };
              });
            }
            return [];
          },
        },
      },
      datalabels: {
        color: "#fff",
        formatter: (value) => `${((value / totalMembers) * 100).toFixed(2)}%`,
        font: {
          weight: "normal" as const,
        },
      },
    },
  };

  return (
    <div className="w-full max-w-lg lg:border-s-2 lg:ps-7 lg:border-marine/50">
      <h1 className="font-semibold text-marine">{title}</h1>
      <h3 className="mt-2 -mb-6 font-medium text-ash">{description}</h3>
      <Doughnut id="doughnut-chart" data={doughnutData} options={doughnutOptions} />
    </div>
  );
}
