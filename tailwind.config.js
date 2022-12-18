/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        "main-color": "#EDA751",
        "sub-color": "#FCD690",
        "custom-gray": "#767676",
        "custom-light-gray": "#dbdbdb",
        "custom-layout-color": "#f3f4f6",
      },
      fontFamily: {
        spoqa: ["Spoqa Han Sans Neo", "sans-serif"],
      },
    },
  },
  plugins: [require("tailwind-scrollbar-hide")],
};
