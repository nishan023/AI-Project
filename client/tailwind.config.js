/** @type {import('tailwindcss').Config} */
export default {
  mode: 'jit',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  important:"#root",
  theme: {
    extend: {
      fontFamily: {
        'inter': ['Inter', 'serif'],
        'roboto': ['Roboto', 'serif'],
        'playFair': ['Playfair Display', 'inter'],
        'hk':['HKGuiseRegular']
      },
      transitionProperty: {
        'width': 'width',
        'opacity': 'opacity',
      },
      colors:{
        bodyMain: {
          light: '#4c4c4c',
          DEFAULT: '#212121',
          dark: '#e53e3e',
        },
      }
    },
  },
  variants: {
    extend: {
      backdropBlur: ['responsive', 'hover', 'focus'],
    },
  },
  plugins: [],
}

