/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // Core backgrounds
        night: "#0a0812",
        nightmid: "#100d1a",
        nightdeep: "#16112a",
        // Purple family
        plum: "#6b3fa0",
        plumlight: "#9b6fd4",
        // Rose gold family
        rosegold: "#d4956a",
        roselight: "#e8b4a0",
        rosedust: "#c4737a",
        // Warm brown (your touch)
        bark: "#6b4226",
        barklight: "#a0673a",
        barkcream: "#d4b896",
        // Text
        parchment: "#f0e6d8",
        muted: "#8a7a9a",
      },
      fontFamily: {
        display: ["Cormorant Garamond", "Georgia", "serif"],
        body: ["DM Mono", "monospace"],
        heading: ["Syne", "sans-serif"],
      },
    },
  },
  plugins: [],
};