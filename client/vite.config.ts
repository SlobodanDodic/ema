import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    port: 5173,
  },
  resolve: {
    alias: {
      "chartjs-plugin-datalabels": "chartjs-plugin-datalabels/dist/chartjs-plugin-datalabels.esm.js",
    },
  },
  optimizeDeps: {
    include: ["chart.js", "chartjs-plugin-datalabels"],
  },
});
