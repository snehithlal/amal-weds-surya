/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        cream: '#FAF7F2',
        ivory: '#FDFBF7',
        emerald: '#0D3B36',
        'emerald-soft': '#165B53',
        'emerald-deep': '#082824',
        sage: '#A3C9B8',
        'sage-light': '#D4E6DF',
        gold: '#D4AF37',
        'gold-light': '#F3E29F',
        'gold-deep': '#B89228',
        ink: '#1A2926',
        'ink-soft': '#455A55',
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
      },
      animation: {
        kenburns: 'kenburns 12s ease-in-out infinite alternate',
        'float-up': 'floatUp linear infinite',
        shimmer: 'shimmer 6s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}

