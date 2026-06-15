/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cyber: {
          dark: '#0a0a0a',
          purple: '#bc13fe',
          teal: '#00f2ff',
          neon: '#39ff14'
        }
      }
    },
  },
  plugins: [],
}