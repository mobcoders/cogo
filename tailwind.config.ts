import type { Config } from 'tailwindcss';
import { nextui } from '@nextui-org/react';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        purple: {
          '50': '#ebefff',
          '100': '#dbe1ff',
          '200': '#bec7ff',
          '300': '#97a1ff',
          '400': '#6e6fff',
          '500': '#5a4dff',
          '600': '#5334fe',
          '700': '#4321e1',
          '800': '#361eb5',
          '900': '#30218e',
          '950': '#1d1353',
        },
        pink: {
          '50': '#fef2f2',
          '100': '#fde3e3',
          '200': '#fdcbcb',
          '300': '#faa8a7',
          '400': '#f57574',
          '500': '#ed5453',
          '600': '#d92a29',
          '700': '#b6201f',
          '800': '#971e1d',
          '900': '#7d201f',
          '950': '#440b0b',
        },

        'dark-grey': '#2C2D32',
        'light-grey': '#B6B6B6',
        white: '#FFFFFF',
        black: '#1E1E1E',
      },
      dropShadow: {
        cogo: '0px 0px 5px rgba(0, 0, 0, 0.15)',
      },
    },
  },
  darkMode: 'class',
  plugins: [
    nextui({
      themes: {
        light: {
          colors: {
            background: '#FFFFFF',
            foreground: '#11181C',
            primary: {
              500: '#ed5453',
            },
            secondary: {
              500: '#5a4dff',
            },
          },
        },
        dark: {
          colors: {
            background: '#121212',
            foreground: '#ECEDEE',
            primary: {
              500: '#3f3f46',
            },
            secondary: {
              500: '#3f3f46',
            },
          },
          // ... rest of the colors
        },
      },
    }),
  ],
};
export default config;
