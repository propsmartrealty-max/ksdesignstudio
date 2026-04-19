/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        charcoal: '#1A1A1A',
        brass: '#D4AF37',
        sand: '#F7F3F0',
        mocha: '#3D2B1F'
      },
      fontFamily: {
        sans: ['"Outfit"', 'sans-serif'],
        inter: ['"Inter"', 'sans-serif'],
      },
      animation: {
        'slow-zoom': 'slow-zoom 20s infinite alternate cubic-bezier(0.45, 0.05, 0.55, 0.95)',
        'fade-in': 'fade-in 1.5s ease-out forwards',
        'fade-in-up': 'fade-in-up 1.2s ease-out forwards',
      },
      keyframes: {
        'slow-zoom': {
          '0%': { transform: 'scale(1)' },
          '100%': { transform: 'scale(1.1)' },
        },
        'fade-in': {
          'from': { opacity: '0' },
          'to': { opacity: '1' },
        },
        'fade-in-up': {
          'from': { opacity: '0', transform: 'translateY(20px)' },
          'to': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
};
