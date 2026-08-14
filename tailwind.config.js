/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        background: '#0B0D10',
        surface: '#11151A',
        elevated: '#171C22',
        border: '#252B33',
        primary: '#F5F7FA',
        secondary: '#9AA4B2',
        muted: '#687383',
        accent: '#6C63FF',
        success: '#22C55E',
        warning: '#F59E0B',
        error: '#EF4444',
      },
    },
  },
  plugins: [],
}
