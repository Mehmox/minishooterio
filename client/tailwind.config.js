/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      height: {
        "test": "800px"
      },
      width: {
        "input":"500px",
        "test": "800px"
      }
    },
  },
  plugins: [],
}