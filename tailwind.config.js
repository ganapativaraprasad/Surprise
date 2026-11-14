/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        memory: {
          pink: '#FFD1DC',
          pinkLight: '#FFF0F5',
          pinkDeep: '#F472B6',
          lavender: '#E8E0F0',
          lavenderDeep: '#C5ADE2',
          cream: '#FFFDF9',
          creamWarm: '#FDF6E2',
          peach: '#FFE5D9',
          peachDeep: '#FDA085',
          purple: '#ECE4F9',
          gold: '#F6D365',
          goldDeep: '#D97706',
          text: '#4A3E4D',
          muted: '#8E7C93'
        },
        universe: {
          midnight: '#050814',
          night: '#0B1021',
          indigo: '#131A38',
          violet: '#221545',
          moonlight: '#F8FAFC',
          starGlow: '#FEF08A',
          silver: '#CBD5E1',
          accent: '#A78BFA'
        }
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        display: ['"Cinzel"', '"Playfair Display"', 'serif'],
        script: ['"Dancing Script"', '"Caveat"', 'cursive'],
        sans: ['"Plus Jakarta Sans"', 'Inter', 'sans-serif'],
      },
      animation: {
        'float-slow': 'floatSlow 6s ease-in-out infinite',
        'float-reverse': 'floatReverse 7s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 3s ease-in-out infinite',
        'shimmer': 'shimmer 2.5s infinite linear',
        'sparkle': 'sparkle 1.8s infinite ease-in-out',
      },
      keyframes: {
        floatSlow: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-12px) rotate(1.5deg)' },
        },
        floatReverse: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(12px) rotate(-1.5deg)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.6', filter: 'drop-shadow(0 0 10px rgba(254, 240, 138, 0.5))' },
          '50%': { opacity: '1', filter: 'drop-shadow(0 0 25px rgba(254, 240, 138, 0.95))' },
        },
        sparkle: {
          '0%, 100%': { opacity: '0.2', transform: 'scale(0.8)' },
          '50%': { opacity: '1', transform: 'scale(1.2)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        }
      }
    },
  },
  plugins: [],
}

