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
      /* 🎨 Brand Colors */
      colors: {
        primary: "#FF5722",
        secondary: "#263238",
        accent: "#FFA726",
      },

      /* 🔤 Fonts */
      fontFamily: {
        sans: ["Lato", "system-ui", "sans-serif"],
      },

      /* 🎞️ Animations (SAFE & OPTIONAL) */
      keyframes: {
        slideDown: {
          "0%": { transform: "translateY(-8px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
      },

      animation: {
        slideDown: "slideDown 0.25s ease-out",
      },
    },
  },

  plugins: [],
};
