/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: {
          pink: '#ff1493',
          magenta: '#ff007f',
          red: '#e50914',
          dark: '#0a0a0f',
          card: '#13141f',
          border: '#232538',
          hover: '#1c1d2d'
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Poppins', 'Montserrat', 'sans-serif']
      },
      boxShadow: {
        'glow-pink': '0 0 25px -5px rgba(255, 0, 127, 0.4)',
        'glow-red': '0 0 25px -5px rgba(229, 9, 20, 0.4)'
      }
    },
  },
  plugins: [],
}
