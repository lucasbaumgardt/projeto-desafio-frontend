/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        body: "#212121",
        input: "#414141",
        greenBg: "#509D45",
        greenBorder: "#3CB62C",
      },
      fontFamily: {
        primary: ['Montserrat', 'sans-serif'],
        'montserrat-bold': ['Montserrat-Bold', 'sans-serif'],
        'montserrat-extra-bold': ['Montserrat-ExtraBold', 'sans-serif'],
      }
    },
  },
  plugins: [],
}