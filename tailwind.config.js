// @ts-check

const defaultTheme = require("tailwindcss/defaultTheme");

/** @type {import("tailwindcss").Config} */
const tailwindCssConfig = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  plugins: [],
  theme: {
    extend: {
      fontFamily: {
        barlow: ["Barlow", ...defaultTheme.fontFamily.sans],
        "titillium-web": ["Titillium Web", ...defaultTheme.fontFamily.sans],
      },
    },
  },
};

module.exports = tailwindCssConfig;
