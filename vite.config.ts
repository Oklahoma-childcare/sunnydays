import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import { fileURLToPath, URL } from 'node:url';

const p = (file: string) => fileURLToPath(new URL(file, import.meta.url));
export default defineConfig({
  plugins: [react()],
  resolve: { alias: { '@': p('./src') } },
  build: {
    rollupOptions: {
      input: {
        home: p('./index.html'),
        programs: p('./programs/index.html'),
        about: p('./about/index.html'),
        faq: p('./faq/index.html'),
        contact: p('./contact/index.html'),
      },
    },
  },
});
