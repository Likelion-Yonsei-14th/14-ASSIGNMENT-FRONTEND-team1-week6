/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#2D6A4F',
          50: '#F0F7F4',
          100: '#D1EAE0',
          200: '#A3D5C1',
          300: '#74BFA2',
          400: '#46AA83',
          500: '#2D6A4F',
          600: '#245540',
          700: '#1B4030',
        },
        accent: {
          DEFAULT: '#FF7043',
          light: '#FFF3F0',
        },
        muted: '#F4F6F5',
      },
      fontFamily: {
        sans: ['"Noto Sans KR"', 'Inter', 'sans-serif'],
      },
      boxShadow: {
        card: '0 2px 8px rgba(0,0,0,0.08)',
        bottom: '0 -2px 12px rgba(0,0,0,0.06)',
      },
    },
  },
  plugins: [],
}
