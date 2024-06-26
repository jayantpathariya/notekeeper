/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["selector", '[data-theme="dark"]'],
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        kumb: ["Kumbh Sans", "sans-serif"],
      },
      colors: {
        // Light theme
        light: "#FFFBFF",
        "on-light": "#201A18",
        "surface-light": "#FFF8F6",
        "surface-container-low-light": "#FEF1EC",
        "surface-container-highest-light": "#EDE0DB",
        "on-surface-light": "#201A18",
        "on-surface-variant-light": "#52443D",
        "primary-light": "#9D4300",
        "on-primary-light": "#FFFFFF",
        "primary-container-light": "#FFDBCA",
        "on-primary-container-light": "#341100",
        "secondary-container-light": "#FFDBCA",
        "on-secondary-container-light": "#2B160A",
        "outline-light": "#85736B",
        "outline-variant-light": "#D7C2B9",
        "inverse-surface-light": "#362F2C",
        "inverse-on-surface-light": "#FBEEE9",

        // Dark theme
        dark: "#201A18",
        "on-dark": "#EDE0DB",
        "surface-dark": "#181210",
        "surface-container-low-dark": "#201A18",
        "surface-container-highest-dark": "#3A3330",
        "on-surface-dark": "#D0C4BF",
        "on-surface-variant-dark": "#D7C2B9",
        "primary-dark": "#FFB690",
        "on-primary-dark": "#552100",
        "primary-container-dark": "#783200",
        "on-primary-container-dark": "#FFDBCA",
        "secondary-container-dark": "#5C4032",
        "on-secondary-container-dark": "#FFDBCA",
        "outline-dark": "#A08D84",
        "outline-variant-dark": "#52443D",
        "inverse-surface-dark": "#EDE0DB",
        "inverse-on-surface-dark": "#201A18",
      },
    },
  },
  plugins: [],
};
