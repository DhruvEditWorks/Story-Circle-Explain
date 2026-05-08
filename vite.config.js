import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
  base: './',
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          motion: ['framer-motion', 'gsap'],
          cinematic: ['three'],
          vendor: ['react', 'react-dom', 'lucide-react'],
        },
      },
    },
  },
});
