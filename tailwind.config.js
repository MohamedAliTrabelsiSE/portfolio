/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#0b0d11",
        card: "#0f141b",
        raised: "var(--raised)",
        paper: "#f4f7fb",
        mist: "#9aa3b2",
        mint: {
          DEFAULT: "#6ee7b7",
          dim: "#1f8a62",
        },
        line: "var(--line)",
      },
      backgroundImage: {
        glow:
          "radial-gradient(60% 40% at 80% 10%, rgba(110,231,183,0.10), transparent 70%), radial-gradient(50% 40% at 0% 20%, rgba(99,102,241,0.10), transparent 60%)",
      },
    },
  },
  plugins: [],
}
