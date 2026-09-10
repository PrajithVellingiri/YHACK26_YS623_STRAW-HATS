export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#0B0B0B',
        card: '#141414',
        border: '#222222',
        accent: {
          green: '#AEFF00',
          yellow: '#FFB800',
        },
        text: {
          main: '#EDEDED',
          muted: '#888888',
        }
      }
    },
  },
  plugins: [],
}

