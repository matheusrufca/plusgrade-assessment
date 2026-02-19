import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react-swc'
import { fileURLToPath } from 'url'
import compression from 'vite-plugin-compression'
import { defineConfig } from 'vitest/config'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), compression()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  build: {
    minify: 'esbuild',
    rollupOptions: {
      output: {
        manualChunks: {
          react: ['react', 'react-dom'],
        },
      },
    },
  },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./.tooling/test.setup.ts'],
  },
})
