/** @type {import('tailwindcss').Config} */
export default {
  content: [ "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'light-cream': '#FCF2EF', // Buraya əlavə edirik
        'dark-mode-bg': '#111827', // Əgər dark mode üçün də xüsusi rəng istəyirsinizsə
      }
    },
  },
  plugins: [],
}

