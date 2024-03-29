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
    listStyleType: {
      none: 'none',
      disc: 'disc',
      decimal: 'decimal',
      square: 'square',
      roman: 'upper-roman',
    },
    extend: {
      width: {
        main: '1220px',
        three: 'calc(33.3333% - 8px)',
        five: 'calc(20% - 8px)',
        four: 'calc(25% - 8px)',
      },
      minHeight: {
        main: '880px'
      },
      backgroundColor: {
        main: '#D70018',
        gray: '#E9EFFF',
        'bg-btn': 'hsla(0,0%,100%,.2)',
        navigation: 'rgba(0, 0, 0, 0.3)',
        hv: '#f3f4f6',
        'btn-yellow': '#E59441',
        overlay: 'rgba(0, 0, 0, 0.7)',
        overlayWhite: '#ffffff'
      },
      colors: {
        main: '#D70018',
        sidebar: '#343A40',
        'regal-blue': '#485FC7'
      },
      zIndex: {
        '100': '100'
      },
      flex: {
        '2': '2 2 0%',
        '3': '3 3 0%',
        '4': '4 4 0%',
        '5': '5 5 0%',
        '6': '6 6 0%',
        '7': '7 7 0%',
        '8': '8 8 0%',
        '9': '9 9 0%',
      },
      boxShadow: {
        'item-product': '[0 1px 2px 0 rgba(60,64,67,.1)]'
      },
      animation: {
        'slice-top': 'slide-top 0.25s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;',
        'slice-form': 'slide-form 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;'
      },
      keyframes: {
        'slide-top': {
          '0%': {
            '-webkit-transform': 'translateY(0px);',
            transform: 'translateY(0px);'
          },
          '100%': {
            '-webkit-transform': 'translateY(-22px);',
            transform: 'translateY(-22px);'
          }
        },
        'slide-form': {
          '0%': {
            '-webkit-transform': 'translateY(400px);',
            transform: 'translateY(400px);'
          },
          '100%': {
            '-webkit-transform': 'translateY(0px);',
            transform: 'translateY(0px);'
          }
        },
      },
    },
  },
  plugins: [],
}