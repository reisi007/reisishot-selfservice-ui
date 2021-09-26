const extensions = ['hover', 'focus', 'disabled', 'visited']

module.exports = {
  mode: process.env.NODE_ENV === 'production' ? 'aot' : 'jit',
  purge: {
    enabled: process.env.NODE_ENV === 'production',
    content: [
      './src/**/*.html',
      './src/**/*.scss'
    ]
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontWeight: extensions,
      fontFamily: {
        sans: ["-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "Helvetica Neue", "Arial", "Noto Sans", "sans-serif", "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"],
      },
      colors: {
        reisishot: {
          DEFAULT: '#27ae60',
          light: '#2ecc71'
        },
        reisishot_boudoir: {
          DEFAULT: '#d3973b'
        }
      }
    },
  },
  variants: {
    extend: {
      opacity: extensions,
      textColor: extensions,
      backgroundColor: extensions
    },
  },
  plugins: [],
}
