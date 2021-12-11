module.exports = {
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    screens: {
      "msm": "320px",
      "mmd": "375px",
      "mlg": "425px",
      'sm': '640px',
      'md': '1024px',
      'lg': '1280px',
    },
    fontFamily: {
      serif: ["Times New Roman"],
    },
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
