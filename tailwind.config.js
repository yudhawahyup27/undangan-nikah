/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './components/**/*.{js,vue,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './app.vue',
  ],
  theme: {
    extend: {
      fontFamily: {
        cormorant: ['Cormorant Garamond', 'serif'],
        josefin: ['Josefin Sans', 'sans-serif'],
        playfair: ['Playfair Display', 'serif'],
      },
      colors: {
        cream: '#F5EED7',
        ivory: '#FAF7F0',
        gold: '#C9A84C',
        'gold-light': '#E8D08A',
        'deep-navy': '#0A0F1E',
        'soft-rose': '#E8C5C0',
        'blush': '#F2D7D5',
        'midnight': '#080C18',
        'twilight': '#1A1F35',
        'sakura': '#FFB7C5',
        'sage': '#8FAF8A',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'twinkle': 'twinkle 4s ease-in-out infinite',
        'petal-fall': 'petalFall 8s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        twinkle: {
          '0%, 100%': { opacity: '0.3', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.2)' },
        },
        petalFall: {
          '0%': { transform: 'translateY(-10%) rotate(0deg)', opacity: '0.8' },
          '100%': { transform: 'translateY(110vh) rotate(720deg)', opacity: '0' },
        }
      }
    },
  },
  plugins: [],
}
