/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html","./src/**/*.{js,jsx,ts,tsx}"],
  mode: "jit",
  theme: {
    screens: {
      '3xs': "320px",
      '2xs': "480px",
      'xs': "576px",
      'sm': "640px",
      'md': "768px",
      'lg': "1024px",
      'xl': "1280px",
      '2xl': "1536px",
    },
    extend: {
      colors: {
        primary:"#f9fafb",
        secondary: "#22c55e",
        custom1: "",
        custom2: "",
        custom3: "",
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
      screens: {
        '3xl': "1600px",
      }
    },
  },
  variants: {
    extend: {
      backgroundColor: ['dark'],
      textColor: ['dark'],
    },
  },
  plugins: [],
}

