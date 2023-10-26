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
      boxShadow: {
        '3xl': '5px 10px 15px -5px rgba(0, 0, 0, 0.5)',
      },
      animation: {
        'travel-linear': 'travel 3s linear infinite',
        'travel-ease': 'travel 3s ease-in-out infinite',
        'spin-one-way': 'spin 1s linear 1s'
      },
      keyframes: {
        travel: {
          '0%': { left: 'calc(50% - 24px)'},
          '25%': { left: '0%'},
          '75%': { left: 'calc(100% - 48px)'},
          '100%': { left: 'calc(50% - 24px)'}
        },
        spin: {
          '0%': { transform: 'rotate(0deg)' },
          '50%': { transform: 'roate(-180deg)'},
          '100%': { transform: 'rotate(-360deg)' },
        }
      }
    },
  },
  plugins: [],
}