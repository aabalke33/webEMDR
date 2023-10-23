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
        'travel-ease': 'travel 3s ease-in-out infinite'
      },
      keyframes: {
        // travel: {
        //   '0%': { left: '0%'},
        //   '50%': { left: 'calc(100% - 48px)'},
        //   '100%': { left: '0%'}
        // }
        travel: {
          '0%': { left: 'calc(50% - 24px)'},
          '25%': { left: '0%'},
          '75%': { left: 'calc(100% - 48px)'},
          '100%': { left: 'calc(50% - 24px)'}
        }
      }
    },
  },
  plugins: [],
}