import type { Config } from 'tailwindcss';

/**
 * HuellaGo · sistema visual "Cielo de Arequipa"
 * - primary  (cielo):   azul intenso del cielo arequipeño, color de acción
 * - accent   (pelota):  amarillo pelota de tenis, para estrellas y destacados
 * - secondary(parque):  verde de parque, para rutas y estados positivos
 * - rose     (nariz):   coral para adopciones y favoritos
 * - dark     (basalto): tinta principal
 * - cream    (sillar):  fondo de piedra clara
 */
const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#3352F5',
          dark: '#2338C9',
          light: '#8094FF',
          soft: '#E8ECFF',
        },
        secondary: {
          DEFAULT: '#0D7F57',
          dark: '#0B6B4A',
          light: '#4CC596',
        },
        accent: {
          DEFAULT: '#FFC531',
          dark: '#E0A500',
          soft: '#FFF4CF',
        },
        teal: {
          DEFAULT: '#0E7F72',
          dark: '#0A6359',
        },
        rose: {
          DEFAULT: '#D6335A',
          dark: '#B42347',
        },
        bark: {
          DEFAULT: '#555C7A',
          light: '#666C88',
        },
        dark: '#191C33',
        cream: '#F5F6F1',
        sand: '#E6E8EF',
        success: '#12875B',
        error: '#D93636',
        warning: '#D9730D',
        info: '#2F6FEB',
      },
      fontFamily: {
        heading: ['"Bricolage Grotesque Variable"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        body: ['"Figtree Variable"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        card: '22px',
        button: '999px',
        chip: '999px',
      },
      boxShadow: {
        card: '0 1px 0 rgba(25, 28, 51, 0.04), 0 2px 10px rgba(25, 28, 51, 0.05)',
        'card-hover': '0 2px 0 rgba(25, 28, 51, 0.04), 0 18px 40px -12px rgba(25, 28, 51, 0.22)',
        button: '0 6px 0 -2px #1B2BA6, 0 10px 20px -8px rgba(51, 82, 245, 0.55)',
        'button-secondary': '0 6px 0 -2px #084F37, 0 10px 20px -8px rgba(15, 138, 95, 0.45)',
        'button-cta': '0 6px 0 -2px #B88700, 0 10px 20px -8px rgba(255, 197, 49, 0.6)',
        glow: '0 0 0 6px rgba(51, 82, 245, 0.12)',
      },
      transitionTimingFunction: {
        spring: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
        out: 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
    },
  },
  plugins: [],
};

export default config;
