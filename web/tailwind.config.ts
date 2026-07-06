import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#2EC4B6',
          dark: '#1A9E93',
          light: '#5DD9CE',
        },
        secondary: {
          DEFAULT: '#FF6B35',
          dark: '#E85D2C',
        },
        accent: '#FFB627',
        dark: '#1B2838',
        cream: '#FFF8F0',
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
        card: '16px',
        button: '12px',
        chip: '20px',
      },
      boxShadow: {
        card: '0 2px 12px rgba(0, 0, 0, 0.06)',
        'card-hover': '0 4px 20px rgba(0, 0, 0, 0.1)',
        button: '0 2px 8px rgba(46, 196, 182, 0.3)',
        'button-cta': '0 2px 8px rgba(255, 107, 53, 0.3)',
      },
    },
  },
  plugins: [],
};

export default config;
