import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  base: './',
  plugins: [
    react({
      babel: {
        plugins: ['babel-plugin-react-compiler'],
      },
    }),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      '@gtpos/ui': path.resolve(__dirname, '../../packages/ui/src'),
    },
  },
  optimizeDeps: {
    esbuildOptions: {
      define: {
        global: 'window',
      },
    },
  },
  worker: {
    format: 'es',
  },
});
