/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'bg-primary': '#050508',
        'bg-secondary': '#0C0E14',
        'bg-tertiary': '#12151E',
        'border-subtle': '#1C1F2E',
        'border-default': '#252836',
        'accent-primary': '#3B7BF6',
        'accent-secondary': '#6366F1',
        'accent-tertiary': '#0EA5E9',
        'positive': '#22D3A4',
        'negative': '#F43F5E',
        'gold': '#C9A84C',
        'text-primary': '#E8EAF2',
        'text-secondary': '#8B90A7',
        'text-tertiary': '#4A4F66',
      },
      fontFamily: {
        serif: ['Instrument Serif', 'serif'],
        sans: ['Inter', 'sans-serif'],
        mono: ['IBM Plex Mono', 'monospace'],
      },
      maxWidth: {
        'container': '1280px',
      },
      spacing: {
        'section': '160px',
      },
    },
  },
  plugins: [],
};
