/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,ts,jsx,tsx,mdx}', './components/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        'camp': { 400: '#4ade80', 500: '#22c55e', 600: '#16a34a' },
        'midnight': { 300: '#b8b8c1', 400: '#91919f', 500: '#747484', 600: '#5d5d6b', 700: '#4c4c57', 800: '#141418', 900: '#0a0a0c' }
      },
    },
  },
  plugins: [],
}
