/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#6b21a8',
          light: '#a855f7',
          dark: '#4c1d95',
        },
      },
    },
  },
  plugins: [],
}
