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
        greenBg: "#509D46",
        greenBorder: "#3CB62C",
        greenBorder2: "#509D46",
        borderRight: "#509D46"
      },
      backgroundColor:{
        menubar: "#0a0a0a",
        'container-color': '#0a0a0a',
        'card-color': '#212121',
        'page-color': '#3CB62C'
      },
      fontFamily: {
        primary: ['Montserrat', 'sans-serif'],
        'montserrat-800': ['Montserrat-Bold', 'sans-serif'],
        'montserrat-900': ['Montserrat-ExtraBold', 'sans-serif'],
      },
      fontSize: {
        'size-button': '25px'
      },
      width: {
        formWidth: "30%",
        buttonWidth: "55%",
        'screen-md': '768px',
        'screen-lg': '1024px',
        'screen-xl': '1280px',

        'form-sm': '60%',
        'form-md': '50%',
        'form-lg': '40%',
        'form-xl': '40%',

        'container-width': '90%',
        'container-grid': '90%',
        'sm-card-grid': '95%',
        'md-card-grid': '95%',
        'lg-card-grid': '95%',
        'xl-card-grid': '95%',
        'search-div': '40%',
        'search-width': '100%'
      },
      height: {
        'container-height': '95vh',
        'sm-card-grid': '95%',
        'md-card-grid': '95%',
        'lg-card-grid': '95%',
        'xl-card-grid': '95%',
      },
      borderRadius: {
        borderCustom: "15px",
        borderCustom2: "10px",
      },
    },
  },
  plugins: [],
}