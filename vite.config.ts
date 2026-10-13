import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    open: false,
    host: true,
    watch: {
      ignored: [
        '**/*.crdownload',
        '**/videos/**',
        '**/reference_images/**',
        '**/dist/**',
        '**/.git/**',
        '**/*.mp4',
        '**/*.webm',
        '**/*.mov',
        '**/*.png',
        '**/*.jpeg',
        '**/*.jpg'
      ]
    }
  }
});
