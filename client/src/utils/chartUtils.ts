import { ChartOptions, LegendItem } from "chart.js";

export const doughnutChartOptions: (
  total: number,
  side: "left" | "center" | "right" | "bottom" | "top" | "chartArea"
) => ChartOptions<"doughnut"> = (total, side) => ({
  plugins: {
    legend: {
      position: side,
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
      formatter: (value) => `${((value / total) * 100).toFixed(2)}%`,
      font: {
        weight: "normal" as const,
      },
    },
  },
});

export const polarAreaChartOptions: (
  total: number,
  side: "left" | "center" | "right" | "bottom" | "top" | "chartArea"
) => ChartOptions<"polarArea"> = (total, side) => ({
  plugins: {
    legend: {
      position: side,
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
      formatter: (value) => `${((value / total) * 100).toFixed(2)}%`,
      font: {
        weight: "normal" as const,
      },
    },
  },
});

export const barChartOptions: (
  total: number,
  side: "left" | "center" | "right" | "bottom" | "top" | "chartArea"
) => ChartOptions<"bar"> = (total, side) => ({
  plugins: {
    legend: {
      position: side,
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
      formatter: (value) => `${((value / total) * 100).toFixed(2)}%`,
      font: {
        weight: "normal" as const,
      },
    },
  },
});
