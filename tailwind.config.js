/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"], // Make sure this is set
  content: ["./index.html", "./src/**/*.{html,js,css,jsx}"],
  theme: {
    extend: {
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      colors: {},
    },
  },
  plugins: [require("tailwindcss-animate")],
};
