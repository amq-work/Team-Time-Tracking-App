/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#0A0A0F',
        surface: '#12121A',
        'surface-light': '#1A1A25',
        border: '#2A2A35',
        accent: '#FF2D78',
        'accent-hover': '#FF4D91',
        'text-primary': '#FFFFFF',
        'text-secondary': '#8A8A9A',
        'text-muted': '#5A5A6A',
      },
      fontFamily: {
        pixel: ['"Press Start 2P"', 'cursive'],
        sans: ['Inter', 'sans-serif'],
      },
      boxShadow: {
        'glow': '0 0 15px rgba(255, 45, 120, 0.3)',
        'glow-strong': '0 0 25px rgba(255, 45, 120, 0.5)',
      }
    },
  },
  plugins: [],
}