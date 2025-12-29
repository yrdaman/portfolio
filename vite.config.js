import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        hallOfFame: resolve(__dirname, 'hall-of-fame.html'),
        notFound: resolve(__dirname, '404.html'),
      },
    },
  },
});
