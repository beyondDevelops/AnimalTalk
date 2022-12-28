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
      keyframes: {
        "fade-in": {
          "0%": {
            opacity: "0",
          },
          "100%": {
            opacity: "1",
          },
        },
      },
      animation: {
        "fade-in": "fade-in 2s ease-out",
      },
    },
  },
  plugins: [require("tailwind-scrollbar-hide")],
};
