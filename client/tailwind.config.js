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

