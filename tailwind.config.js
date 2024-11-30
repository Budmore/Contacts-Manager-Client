/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'theme-bg': {
          light: '#f3f4f6',
          dark: '#111827',
        },
        'theme-sidebar': {
          light: '#ffffff',
          dark: '#1f2937',
        },
        'theme-text': {
          light: '#111827',
          dark: '#f3f4f6',
        }
      }
    },
  },
  plugins: [],
}