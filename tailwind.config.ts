import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        navy: '#0D2137',
        teal: { 400: '#2DD4BF' },
      },
    },
  },
  plugins: [],
};
export default config;