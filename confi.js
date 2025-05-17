/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: '#0D6EFD',   // Bright Blue
        secondary: '#00D4FF', // Neon Cyan
      },
      fontFamily: {
        sans: ['"Patrick Hand"', 'cursive'], // Now your default
        roboto: ['Roboto', 'sans-serif'],
        hand: ['"Patrick Hand"', 'cursive'], // Use with class "font-hand"
      },
    },
  },
  plugins: [],
};
