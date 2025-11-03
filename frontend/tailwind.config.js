/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#365263',
      },
      fontFamily: {
        jomolhari: ['Jomolhari', 'serif'],
        lobster: ['Lobster Two', 'cursive'],
      },
    },
  },
  plugins: [],
};
