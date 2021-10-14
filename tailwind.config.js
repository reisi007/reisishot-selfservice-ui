function isProd() {
  return process.env.NODE_ENV === 'production'
}

function extensions() {
  return ['hover', 'focus', 'disabled', 'visited']
}

module.exports = {
  mode: isProd() ? 'aot' : 'jit',
  purge: {
    enabled: isProd(),
    content: [
      './src/**/*.html',
      './src/**/*.scss'
    ]
  },
  darkMode: false, // or 'media' or 'class'
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
  variants: {
    extend: {
      opacity: extensions(),
      textColor: extensions(),
      backgroundColor: extensions()
    },
  },
  plugins: [],
}
