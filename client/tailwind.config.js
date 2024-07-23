/** @type {import('tailwindcss').Config} */

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        midnight: "#212A31",
        steel: "#2e3944",
        marine: "#124e66",
        ash: "#748d92",
        silver: "#f2f1e4",
        oranje: "#ffaf1c",
      },
    },
  },
  plugins: [],
};
