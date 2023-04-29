module.exports = {
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      spacing: {
        '2/3': '66.666667%',
        trecol: '32%',
      },
      colors: {
        salmon: '#EB524D',
        thegray: '#404040',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],

};
