/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#006D77',
        secondary: '#EF476F',
        background: '#F5F5F5',
        surface: '#FFFFFF',
        foreground: '#1B2129',
        muted: '#5A6B7C',
        ink: '#1a1a1a',
        'on-ink': '#ffffff',
        'dark-primary': '#296ef9',
        'dark-primary-deep': '#0e3191',
        'dark-ink': '#1a1a1a',
        'dark-foreground': '#E5E5E5',
        'dark-muted': '#A0A0A0',
        'dark-background': '#1A1A1A',
        'dark-surface': '#2D2D2D',
      },
      ringColor: {
        primary: '#006D77',
        secondary: '#EF476F',
        // you can still use any other color via the default colors map
      },
      fontFamily: {
        display: ['"Playfair Display"', 'serif'],
        heading: ['Inter', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
      },
      fontSize: {
        'hero': '64px',
        'section': '40px',
        'body': '16px',
      },
    },
  },
  plugins: [],
  safelist: [
    'btn',
    'btn-primary',
    'btn-secondary',
    'btn-ghost',
    'btn-link',
    'hover-pulse',
    'scale-105',
    'scale-102',
    'glass-card',
    'animate-scale-in',
    'animate-scale-in-up',
  ],
}