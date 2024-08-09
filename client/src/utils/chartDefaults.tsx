import { Chart as ChartJS } from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";

const colorOptions: { [key: string]: string } = {
  midnight: "#212a31",
  steel: "#2e3944",
  marine: "#124e66",
  ash: "#748d92",
  silver: "#fdf261",
  oranje: "#ffaf1c",
  forest: "#228B22",
  crimson: "#a22700",
  violet: "#8A2BE2",
  cyan: "#00CED1",
};

const bgColors = [
  colorOptions.marine,
  colorOptions.oranje,
  colorOptions.steel,
  colorOptions.ash,
  colorOptions.midnight,
  colorOptions.silver,
  colorOptions.forest,
  colorOptions.crimson,
  colorOptions.violet,
  colorOptions.cyan,
];

export function setChartDefaults() {
  // Register the datalabels plugin
  ChartJS.register(ChartDataLabels);

  // Set global defaults
  ChartJS.defaults.plugins.legend.position = "top";
  ChartJS.defaults.plugins.tooltip.enabled = true;
  ChartJS.defaults.color = "#333";

  // Set default datalabels options
  ChartJS.defaults.plugins.datalabels = {
    color: "#fff",
    font: {
      weight: "bold" as const,
    },
  };

  // Set default colors for pie charts
  ChartJS.defaults.datasets.pie.backgroundColor = bgColors;
  ChartJS.defaults.datasets.pie.hoverBackgroundColor = bgColors.map((color) => `${color}80`);

  // Set default colors for bar charts
  ChartJS.defaults.datasets.bar.backgroundColor = bgColors.slice(0, 2);
  ChartJS.defaults.datasets.bar.hoverBackgroundColor = bgColors.slice(0, 2).map((color) => `${color}80`);
}
