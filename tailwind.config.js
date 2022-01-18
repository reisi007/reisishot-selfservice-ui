function extensions() {
  return ['hover', 'focus', 'disabled', 'visited']
}

module.exports = {
  content: [
    './src/**/*.html',
    './src/**/*.scss'
  ],
  theme: {
    extend: {
      fontWeight: extensions(),
      fontFamily: {
        sans: ["system-ui", "-apple-system", "Segoe UI", "Roboto", "Helvetica Neue", "Arial", "Noto Sans", "Liberation Sans", "sans-serif", "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"],
      },
      colors: {
        reisishot: {
          DEFAULT: '#27ae60',
          light: '#2ecc71'
        }
      }
    },
  },
  plugins: [],
}
