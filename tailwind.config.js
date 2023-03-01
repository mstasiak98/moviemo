/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        primary900: '#17171b',
        primary: '#20222c',
        accent100: '#75777a'
      }
    },
  },
  plugins: [],
}
