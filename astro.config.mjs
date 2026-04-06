import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://ioon.mx',
  output: 'static',
  vite: {
    plugins: [tailwindcss()],
  },
});
