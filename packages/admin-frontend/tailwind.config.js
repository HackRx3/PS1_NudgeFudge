/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          300: "#007aff",
          500: "#002a53",
          700: "#002142",
        },
        black: "#1a1a1a",
        white: "#fefefe",
        offWhite: "#efefef",
      },
    },
  },
  plugins: [],
  safelist: [
    {
      pattern: /modal-(enter|exit)/,
    },
    {
      pattern: /modal-(enter|exit)-(enter|active|done)/,
    },
  ],
};
