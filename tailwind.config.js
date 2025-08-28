// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#e6f7ff',
          500: '#1890ff',
          600: '#0050b3',
        },
        success: {
          500: '#52c41a',
        },
        purple: {
          500: '#722ed1',
        },
        cyan: {
          500: '#13c2c2',
        },
      },
    },
  },
  plugins: [],
}