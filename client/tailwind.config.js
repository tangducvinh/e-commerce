/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,js}",
    "./public/index.html"
  ],

  theme: {
    fontFamily: {
      main: ['Roboto', 'sans-serif']
    },
    extend: {
      width: {
        main: '1220px'
      },
      backgroundColor: {
        main: '#D70018',
        gray: '#E9EFFF',
        'bg-btn': 'hsla(0,0%,100%,.2)',
        navigation: 'rgba(0, 0, 0, 0.3)',
        hv: '#f3f4f6',
        'btn-yellow': '#E59441',
      },
      colors: {
        main: '#D70018',
        sidebar: '#343A40'
      },
      flex: {
        '2': '2 2 0%',
        '3': '3 3 0%',
        '4': '4 4 0%',
        '5': '5 5 0%',
        '6': '6 6 0%',
        '7': '7 7 0%',
      },
    },
  },
  plugins: [],
}