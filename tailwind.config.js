/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        tg: {
          sidebar: '#0e1621',
          header: '#17212b',
          chat: '#0e1621',
          hover: '#202b36',
          active: '#2b5278',
          border: '#101921',
          input: '#242f3d',
          accent: '#5288c1',
          blue: '#2481cc',
          'blue-light': '#40a7e3',
          incoming: '#182533',
          outgoing: '#2b5278',
          'outgoing-mobile': '#2b5278',
          'incoming-mobile': '#182533',
          text: '#f5f5f5',
          muted: '#7e8c99',
          green: '#4fae4e',
          online: '#4fae4e',
          badge: '#2481cc',
          badgeGray: '#3e546a'
        }
      },
      fontFamily: {
        sans: ['"Roboto"', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'sans-serif'],
      }
    },
  },
  plugins: [],
}

