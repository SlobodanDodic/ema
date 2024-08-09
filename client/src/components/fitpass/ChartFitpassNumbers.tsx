import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title } from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { bgColors } from "../benefits/chartColors";

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title, ChartDataLabels);

interface ChartFitpassNumbersProps {
  employeesTotal: number;
  totalFitpassMembers: number;
  employeeWithoutFitpass: number;
}

export default function ChartFitpassNumbers({
  employeesTotal,
  totalFitpassMembers,
  employeeWithoutFitpass,
}: ChartFitpassNumbersProps) {
  const barData = {
    labels: ["Employees Members", "Employees without Fitpass", "Fitpass Members"],
    datasets: [
      {
        label: "Total",
        data: [employeesTotal, employeeWithoutFitpass, totalFitpassMembers],
        backgroundColor: bgColors,
      },
    ],
  };

  return (
    <div className="flex flex-col items-center justify-center p-4 space-y-8">
      <div className="w-full max-w-md py-8">
        <h2 className="mb-4 font-semibold text-center text-marine">Total Numbers</h2>
        <Bar data={barData} options={{ scales: { y: { beginAtZero: true } } }} />
      </div>
    </div>
  );
}
