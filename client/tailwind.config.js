/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        navy: {
          50:  '#f0f4fa',
          100: '#dce6f5',
          200: '#b9cceb',
          300: '#8aaade',
          400: '#5b84ce',
          500: '#3a63ba',
          600: '#2c4e9e',
          700: '#1a2e5a',
          800: '#162549',
          900: '#111c38',
        },
        teal: {
          50:  '#f0fafb',
          100: '#d0f2f6',
          200: '#a1e5ed',
          300: '#63d3e0',
          400: '#3ecad8',
          500: '#24b0bf',
          600: '#1d8e9e',
          700: '#1a7080',
          800: '#1a5a66',
          900: '#194a54',
        },
        cream: '#faf6f0',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
