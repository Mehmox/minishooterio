/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
     "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      height: {
        "test": "800px"
      },
      width: {
        "input":"600px",
        "test": "800px"
      }
    },
  },
  plugins: [],
}