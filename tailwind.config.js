/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        cream: '#FAF8F5',
        ivory: '#FDFCF9',
        olive: '#3A4B3C',
        'olive-soft': '#4A5D4E',
        'olive-deep': '#273528',
        sage: '#6B7F6D',
        'sage-light': '#D0DBCF',
        gold: '#D4AF37',
        'gold-light': '#F3E29F',
        'gold-deep': '#B89228',
        ink: '#1C261D',
        'ink-soft': '#4B594C',
      },
      fontFamily: {
        display: ['"Cormorant Garamond"', 'serif'],
        script: ['"Pinyon Script"', 'cursive'],
        heading: ['Marcellus', 'serif'],
        body: ['Inter', 'sans-serif'],
      },
      keyframes: {
        kenburns: {
          '0%': { transform: 'scale(1) translateY(0px)' },
          '100%': { transform: 'scale(1.08) translateY(-15px)' },
        },
        shimmer: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
      },
      animation: {
        kenburns: 'kenburns 12s ease-in-out infinite alternate',
        shimmer: 'shimmer 6s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
