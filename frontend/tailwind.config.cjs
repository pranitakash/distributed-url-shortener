/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: "class", // 🔥 THIS WAS MISSING
  theme: {
    extend: {},
  },
  plugins: [],
};
