/** @type {import('tailwindcss').Config} */
// Palette: deep-space navy base (#04060E, matching the founder portfolio) with
// electric blue → violet accents and a silver-white that echoes the BIZ-TALKS badge.
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        void: '#04060e',
        ink: '#070b19',
        graphite: '#0b1226',
        steel: '#1a2342',
        mist: '#8f98b8',
        ice: '#d9e1ff',
        frost: '#f5f7ff',
        cyan: { DEFAULT: '#7c9cff', deep: '#4f6bff' }, // primary accent: electric periwinkle blue
        violet: { DEFAULT: '#a27bff', deep: '#7c4dff' },
        sky: '#5ad1ff',
      },
      fontFamily: {
        display: ['"Space Grotesk Variable"', 'system-ui', 'sans-serif'],
        sans: ['"Inter Variable"', 'system-ui', 'sans-serif'],
        serif: ['"Instrument Serif"', 'Georgia', 'serif'],
      },
      maxWidth: { site: '1240px' },
    },
  },
  plugins: [],
}
