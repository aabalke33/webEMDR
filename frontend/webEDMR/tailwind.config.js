/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      'coolvetica': ['Coolvetica'],
      'roboto': ['Roboto']
    },
    extend: {
      animation: {
        'travel': 'travel 10s linear infinite'
      },
      keyframes: {
        travel: {
          '0%': { left: '0%'},
          '50%': { left: 'calc(100% - 48px)'},
          '100%': { left: '0%'}
        }
      }
    },
  },
  plugins: [],
}