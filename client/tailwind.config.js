/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        keppel: {
          50: "#effefa",
          100: "#c7fff1",
          200: "#90ffe3",
          300: "#51f7d4",
          400: "#1de4c0",
          500: "#04c8a7",
          600: "#00b298",
          700: "#05806f",
          800: "#0a655a",
          900: "#0d544b",
          950: "#00332f",
        },
      },
    },
  },
  plugins: [],
};
