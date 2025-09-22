// file: tailwind.config.js

const defaultTheme = require('tailwindcss/defaultTheme'); // <-- ตรวจสอบว่ามีบรรทัดนี้อยู่บนสุดนะครับ

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        // เราเรียกใช้ defaultTheme ที่นี่...
        sans: ['var(--font-noto-sans-thai)', ...defaultTheme.fontFamily.sans],
      },
      colors: {
        'brand-red': '#C81E1E',
        'brand-red-dark': '#A01818',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
}