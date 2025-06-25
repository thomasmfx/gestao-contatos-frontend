import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

// https://vite.dev/config/
export default defineConfig({
  server: {
    proxy: {
      '^/(contatos|clientes)': {
        target: 'http://backend:8080',
        changeOrigin: true,
      },
    },
  },
  test: {
    setupFiles: './tests/setup.js',
    environment: 'jsdom',
  },
  plugins: [react()],
});
