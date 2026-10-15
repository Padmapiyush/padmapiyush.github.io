/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
    "./lib/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        multiverse: {
          dark: "#0B0B14",
          card: "#121224",
          surface: "#1A1A32",
          border: "#2A2A4E",
          hover: "#252545",
        },
        violet: {
          accent: "#8B5CF6",
          light: "#A78BFA",
          dark: "#6D28D9",
        },
        cyan: {
          accent: "#22D3EE",
          light: "#67E8F9",
          dark: "#0891B2",
        },
        gold: {
          accent: "#F59E0B",
          light: "#FCD34D",
          dark: "#B45309",
        },
      },
      fontFamily: {
        mono: ["'Fira Code'", "monospace"],
        sans: ["Inter", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "sans-serif"],
      },
      animation: {
        "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "glow-violet": "glowViolet 2s ease-in-out infinite alternate",
        "glow-cyan": "glowCyan 2s ease-in-out infinite alternate",
      },
      keyframes: {
        glowViolet: {
          "0%": { boxShadow: "0 0 15px rgba(139, 92, 246, 0.3)" },
          "100%": { boxShadow: "0 0 30px rgba(139, 92, 246, 0.7)" },
        },
        glowCyan: {
          "0%": { boxShadow: "0 0 15px rgba(34, 211, 238, 0.3)" },
          "100%": { boxShadow: "0 0 30px rgba(34, 211, 238, 0.7)" },
        },
      },
    },
  },
  plugins: [],
};
