import { Pie, Bar } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title } from "chart.js";
import { setChartDefaults } from "../../utils/chartDefaults";

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title);

setChartDefaults();

interface FitpassChartsProps {
  employeesTotal: number;
  fitpassTotal: number;
  categoryData: { [key: string]: number };
}

export default function FitpassCharts({ employeesTotal, fitpassTotal, categoryData }: FitpassChartsProps) {
  const categoryLabels = Object.keys(categoryData);
  const categoryValues = Object.values(categoryData);

  const pieData = {
    labels: categoryLabels,
    datasets: [
      {
        data: categoryValues,
      },
    ],
  };

  const barData = {
    labels: ["Employees", "Fitpass Members"],
    datasets: [
      {
        label: "Total",
        data: [employeesTotal, fitpassTotal],
      },
    ],
  };

  return (
    <div className="flex flex-col items-center justify-center p-4 space-y-8">
      <div className="w-full max-w-md">
        <h2 className="mb-4 text-xl font-semibold text-center">Fitpass Membership Distribution</h2>
        <Pie data={pieData} />
      </div>

      <div className="w-full max-w-md">
        <h2 className="mb-4 text-xl font-semibold text-center">Total Numbers</h2>
        <Bar data={barData} options={{ scales: { y: { beginAtZero: true } } }} />
      </div>
    </div>
  );
}
