/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./public/index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        LINESeedKR: ['LINESeedKR', 'system-ui', 'sans-serif'],
      },
      width: {
        128: '32rem',
      },
      height: {
        128: '32rem',
      },
      colors: {
        yejun: '#5a9bff',
        noah: '#ae3ce7',
        bamby: '#f3398b',
        eunho: '#c02929',
        hamin: '#00DFAA',
        plli: '#000000',
      },
    },
  },
  plugins: [],
};
