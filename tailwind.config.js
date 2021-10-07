const extensions = ['hover', 'focus', 'disabled', 'visited']
const isProd = process.env.NODE_ENV === 'production';

module.exports = {
  mode: isProd ? 'aot' : 'jit',
  purge: {
    enabled: isProd,
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
