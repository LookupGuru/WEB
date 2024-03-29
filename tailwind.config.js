const colors = require('tailwindcss/colors')

/** @type {import('tailwindcss').Config} */
module.exports = {
  theme: {
    extend: {
      colors: {
        gray: colors.gray
      },
      height: {
        screen: 'var(--app-height, 100vh)'
      },
      minHeight: {
        screen: 'var(--app-height, 100vh)'
      }
    },
    screens: {
      sm: '640px',
      md: '768px',
      lg: '1072px',
      xl: '1220px'
    }
  },
  variants: {
    extend: {
      translate: ['group-hover']
    }
  },
  plugins: [require('@tailwindcss/forms')]
}
