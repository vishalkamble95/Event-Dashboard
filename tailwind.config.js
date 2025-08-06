/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}", // ✅ Add ts/tsx for safety
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
