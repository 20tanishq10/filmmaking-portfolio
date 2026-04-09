/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        mono: ['"Courier Prime"', 'Courier', 'monospace'],
        sans: ['"Inter"', 'sans-serif'],
      },
      colors: {
        film: {
          black: 'var(--color-black)',
          dark: 'var(--color-dark)',
          gray: 'var(--color-gray)',
          muted: 'var(--color-muted)',
          gold: 'var(--color-gold)',
          cream: 'var(--color-cream)',
        },
      },
    },
  },
  plugins: [],
}
