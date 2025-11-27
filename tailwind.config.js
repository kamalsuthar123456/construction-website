/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "1rem",
    },
    extend: {
      colors: {
        primary: '#FF5722',
        secondary: '#263238',
        accent: '#FFA726',
      },
      fontFamily: {
        sans: ['Lato', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
