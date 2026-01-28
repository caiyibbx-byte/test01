
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  // base 设置为 './' 确保在 GitHub Pages 的子路径下也能正常访问资源
  base: './',
  build: {
    outDir: 'dist',
  },
  server: {
    port: 3000
  }
});
