/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontSize: {
        35: '35px'
      },
      spacing: {
        21.6: '21.44rem',
      },
      colors: {
        'FB9400': '#FB9400',
        '1677ff': '#1677ff',
        '1677FF1A': '#1677FF1A'

      },
    },
  },
  plugins: [],
}


