/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        pearl: '#FCFAF7',
        'pearl-soft': '#F7F4EE',
        eucalyptus: '#2F483D',
        'eucalyptus-deep': '#1F342B',
        sage: '#4A6B5D',
        'sage-light': '#E6EFEA',
        'sage-mist': '#F0F6F3',
        champagne: '#E5C687',
        gold: '#D4AF37',
        'gold-light': '#F7EAB7',
        'gold-deep': '#A8842F',
        ink: '#1F2B26',
        'ink-soft': '#4C5C55',
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
        floatUp: {
          '0%': { opacity: '0', transform: 'translateY(0px)' },
          '20%': { opacity: '0.7' },
          '100%': { opacity: '0', transform: 'translateY(-100vh)' },
        },
        shimmer: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.4', transform: 'scale(1)' },
          '50%': { opacity: '0.85', transform: 'scale(1.04)' },
        },
      },
      animation: {
        kenburns: 'kenburns 12s ease-in-out infinite alternate',
        'float-up': 'floatUp linear infinite',
        shimmer: 'shimmer 6s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 3s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
