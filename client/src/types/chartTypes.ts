export interface ChartProps {
  categoryData: { [key: string]: number };
  title: string;
  description: string;
  total: number;
  side?: "left" | "center" | "right" | "bottom" | "top" | "chartArea";
}
