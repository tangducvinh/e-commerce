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
        hv: '#f3f4f6'
      },
      colors: {
        main: '#D70018',
        sidebar: '#343A40'
      }
    },
  },
  plugins: [],
}