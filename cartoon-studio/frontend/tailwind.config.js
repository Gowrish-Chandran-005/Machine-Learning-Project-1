/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Cal Sans', 'Inter', 'sans-serif'],
      },
      colors: {
        ink: '#0A0A0F',
        surface: '#111118',
        panel: '#17171F',
        border: '#2A2A38',
        accent: '#7C6EF8',
        'accent-bright': '#A78BFA',
        teal: '#2DD4BF',
        coral: '#F97316',
      },
      backgroundImage: {
        'glow-accent': 'radial-gradient(ellipse at center, rgba(124,110,248,0.15) 0%, transparent 70%)',
        'glow-teal': 'radial-gradient(ellipse at center, rgba(45,212,191,0.12) 0%, transparent 70%)',
        'grid': "url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32' width='32' height='32' fill='none' stroke='rgb(255 255 255 / 0.03)'%3e%3cpath d='M0 .5H31.5V32'/%3e%3c/svg%3e\")",
      }
    },
  },
  plugins: [],
}
