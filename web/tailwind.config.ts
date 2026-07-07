import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#E8825A',   // Naranja terracota calido (pelaje dorado)
          dark: '#D4763C',
          light: '#F2A67D',
        },
        secondary: {
          DEFAULT: '#7C5CBF',   // Morado suave (collar elegante)
          dark: '#6B4FA8',
          light: '#9B7FD4',
        },
        accent: '#FFB627',      // Amarillo dorado (golden retriever)
        teal: {
          DEFAULT: '#2EC4B6',   // Verde agua (parques/naturaleza)
          dark: '#1A9E93',
        },
        rose: {
          DEFAULT: '#E85D75',   // Rosa (naricita)
          dark: '#D14B63',
        },
        bark: {
          DEFAULT: '#8B6F47',   // Marron corteza
          light: '#A68B5B',
        },
        dark: '#2D1B0E',        // Marron oscuro (chocolate lab)
        cream: '#FFF9F2',       // Crema calido
        sand: '#F5E6D3',        // Arena
        success: '#38A169',
        error: '#E53E3E',
        warning: '#DD6B20',
        info: '#3182CE',
      },
      fontFamily: {
        heading: ['Nunito', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
      },
      borderRadius: {
        card: '20px',
        button: '14px',
        chip: '24px',
      },
      boxShadow: {
        card: '0 2px 16px rgba(45, 27, 14, 0.06)',
        'card-hover': '0 8px 32px rgba(45, 27, 14, 0.12)',
        button: '0 4px 12px rgba(232, 130, 90, 0.35)',
        'button-secondary': '0 4px 12px rgba(124, 92, 191, 0.3)',
        'button-cta': '0 4px 12px rgba(255, 182, 39, 0.35)',
        glow: '0 0 20px rgba(232, 130, 90, 0.2)',
      },
    },
  },
  plugins: [],
};

export default config;
