// @ts-check

const defaultTheme = require("tailwindcss/defaultTheme");

/** @type {import("tailwindcss").Config} */
const tailwindCssConfig = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  plugins: [],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-titillium-web)", ...defaultTheme.fontFamily.mono],
      },
    },
    zIndex: {
      drawer: "3",
      loader: "1",
      navbar: "2",
    },
  },
};

module.exports = tailwindCssConfig;
