/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,vue,jsx,tsx}'],
  theme: {
    extend: {},
    colors: {
      bal: '#121417',
      'black': '#121417',
      'green': '#85AA9F',
      'main': '#FCFCFC',
      'white1': '#F8F8F8'
    },
    fontSize: {
      h1: '40px',
      h2: '20px',
      medium: '14px'
    },
    fontWeight: {
      regular:400,
      standart: 500,
      semibold: 600,

    }
  },
  plugins: []
}
