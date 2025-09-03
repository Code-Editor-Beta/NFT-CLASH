/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#9333ea",
          50: "#faf5ff",
          100: "#f3e8ff",
          500: "#9333ea",
          600: "#7c3aed",
          700: "#6d28d9",
        },
        accent: {
          DEFAULT: "#ec4899",
          500: "#ec4899",
          600: "#db2777",
        },
        success: "#10b981",
        gold: "#fbbf24",
      },
      backgroundImage: {
        "gradient-main": "linear-gradient(135deg, #1a0033 0%, #000000 100%)",
        "gradient-card":
          "linear-gradient(135deg, rgba(147, 51, 234, 0.1) 0%, rgba(236, 72, 153, 0.1) 100%)",
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        glow: "glow 2s ease-in-out infinite alternate",
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        glow: {
          "0%": {
            boxShadow: "0 0 5px #9333ea, 0 0 10px #9333ea, 0 0 15px #9333ea",
          },
          "100%": {
            boxShadow: "0 0 10px #ec4899, 0 0 20px #ec4899, 0 0 30px #ec4899",
          },
        },
      },
    },
  },
  plugins: [],
};
