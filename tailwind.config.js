/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      gridTemplateColumns: {
        '16': 'repeat(16, minmax(0, 1fr))',
      },
      fontFamily: {
        cinzel: ['Cinzel', 'serif'],
        serif: ['Instrument Serif', 'serif'],
        mono: ['JetBrains Mono', 'monospace'],
        sans: ['Plus Jakarta Sans', 'sans-serif'],
        syne: ['Syne', 'sans-serif'],
      },
      colors: {
        hb: {
          crimson: '#D50032', // User Palette 1
          wine: '#A50034',    // User Palette 5
          pink: '#FFB3BA',    // User Palette 4
          blush: '#F9C2C2',   // User Palette 3
          white: '#FFFFFF',   // User Palette 2
          bgLight: '#F7F6F3', // Softer warm white base
          greyLight: '#EFECE8', // Softer light grey
          greyCard: '#F5F3EF',  // Light grey card
          darkText: '#18070F',  // Deep wine-charcoal for crisp readability
          bodyText: '#3F353A',  // Rich soft charcoal body
          mutedText: '#7A6E74', // Soft grey-wine secondary text
        },
        gold: {
          light: '#f7d8ad',
          DEFAULT: '#e0a96d',
          dark: '#996515',
        }
      }
    },
  },
  plugins: [],
}
