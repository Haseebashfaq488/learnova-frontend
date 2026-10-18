/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: '#0B1B33',
          light: '#1E293B',
          muted: '#64748B',
          subtle: '#94A3B8',
        },
        brand: {
          navy: '#0B1B33',
          indigo: '#4338CA',
          electric: '#4F46E5',
          cyan: '#0284C7',
          teal: '#0D9488',
          mint: '#10B981',
          canvas: '#F8FAFC',
          card: '#FFFFFF',
          border: '#E2E8F0',
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'system-ui', 'sans-serif'],
        serif: ['Fraunces', 'Georgia', 'serif'],
        tech: ['Space Grotesk', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      boxShadow: {
        'subtle': '0 1px 2px 0 rgba(11, 27, 51, 0.04)',
        'float': '0 12px 32px -4px rgba(11, 27, 51, 0.08), 0 4px 12px -2px rgba(11, 27, 51, 0.03)',
        'glow': '0 0 24px -4px rgba(79, 70, 229, 0.15)',
        'nav': '0 10px 30px -10px rgba(11, 27, 51, 0.06)',
      },
      animation: {
        'pulse-subtle': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float-slow': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-6px)' },
        }
      }
    },
  },
  plugins: [],
}
