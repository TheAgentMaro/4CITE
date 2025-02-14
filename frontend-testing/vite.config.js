import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
  plugins: [react()],
  root: resolve(__dirname, 'src/ex7'),
  base: '/',
  server: {
    port: 3000,
    host: true, 
    strictPort: true, 
    watch: {
      usePolling: true 
    }
  },
  build: {
    outDir: resolve(__dirname, 'dist'),
    emptyOutDir: true
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src/ex7')
    }
  }
});
