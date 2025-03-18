/** @type {import('tailwindcss').Config} */
module.exports = {
  variants:{
    backgroundImage:['responsive','hover','focus'],
  },
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        "mini": "400px"
      },
      colors: theme => ({
        "dyon-default": "#5e2a82",
        "dyon-light": "#7f529f",
        "dyon-red": "#F15F45",
        "dyon-yellow": "#E6C225",
        "typo": "#091747",
        "mute": "#636e72",
        "disabled": "#403e42",
        "typo-2": "#333333",
        "typo-title": "#2D3436"
      }),
      fontFamily: {
        sans: ["Inter", "Helvetica", "sans-serif"],
        "footer-title": ["Inria Sans", "sans-serif"]
      }
    },
  },
  plugins: [],
}
