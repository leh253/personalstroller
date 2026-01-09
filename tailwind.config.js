
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: { 
        sans: ['"Outfit"', 'sans-serif'],
        serif: ['"Playfair Display"', 'serif'],
      },
      colors: {
        navy: { 
          950: '#0f172a',
          900: '#151b2b', 
          800: '#1e293b' 
        },
        gold: { 
          300: '#e0c9a6',
          400: '#c5a065', 
          500: '#b08d55', 
          600: '#8c6b3a' 
        }
      },
      boxShadow: {
        'glow': '0 0 20px -5px rgba(197, 160, 101, 0.3)',
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.3)',
      },
      animation: {
        'in': 'fadeIn 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'in-up': 'fadeInUp 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        fadeIn: { '0%': { opacity: '0' }, '100%': { opacity: '1' } },
        fadeInUp: { '0%': { opacity: '0', transform: 'translateY(20px)' }, '100%': { opacity: '1', transform: 'translateY(0)' } }
      }
    }
  },
  plugins: [],
}
