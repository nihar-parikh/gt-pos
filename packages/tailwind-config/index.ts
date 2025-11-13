import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#000000',
        secondary: 'red',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        serif: ['Merriweather', 'serif'],
        poppins: ['Poppins', 'sans-serif'],
      },
      fontSize: {
        '21': '21.46px',
        '20': '18.78px',
      },
      backgroundColor: {
        'login-btn-bg': '#007BFF',
      },
    },
  },
  plugins: [],
};

export default config;
