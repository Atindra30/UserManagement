/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Your source files
    "./public/index.html",        // (Optional) Include the public folder if needed
  ],
  theme: {
    extend: {}, // Customize your theme here if needed
  },
  plugins: [], // Add any additional plugins you use
});


