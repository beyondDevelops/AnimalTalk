/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        "m-color": "#EDA751",
        "s-color": "#FCD690",
        "cst-gray": "#767676",
        "cst-light-gray": "#dbdbdb",
        "cst-layout": "#f3f4f6",
      },
      fontFamily: {
        spoqa: ["Spoqa Han Sans Neo", "sans-serif"],
      },
    },
  },
  plugins: [require("tailwind-scrollbar-hide")],
};
