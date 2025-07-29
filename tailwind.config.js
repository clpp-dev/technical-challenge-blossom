/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
   theme: {
    extend: {
      colors: {
        primary: {
          '100': '#EEE3FF',
          '600': '#8054C7',
          '700': '#5A3696',
          '900': '#1e3a8a',
        },
        secondary: {
          '500': '#63D838',
          '600': '#63D838',
        }
      },
      fontFamily: {
        'rick': ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}