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
      backgroundColor:{
        menubar: "#000000"
      },
      fontFamily: {
        primary: ['Montserrat', 'sans-serif'],
        'montserrat-800': ['Montserrat-Bold', 'sans-serif'],
        'montserrat-900': ['Montserrat-ExtraBold', 'sans-serif'],
      },
      width: {
        formWidth: "30%",
        buttonWidth: "55%"
      },
      height: {
        
      },
      borderRadius: {
        borderCustom: "15px",
      },
    },
  },
  plugins: [],
}