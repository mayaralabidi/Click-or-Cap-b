/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'light-beige': '#FAF9F6',
        'med-blue': '#0077B6',
        'alert-red': '#e12320',
      },
      fontFamily: {
        'space': ['"Space Grotesk"', 'sans-serif'],
      },
      boxShadow: {
        'neo': '6px 6px 0px 0px rgba(0, 0, 0, 1)',
        'neo-hover': '10px 10px 0px 0px rgba(0, 0, 0, 1)',
        'neo-red': '4px 4px 0px 0px #e12320',
      }
    },
  },
  plugins: [],
}
