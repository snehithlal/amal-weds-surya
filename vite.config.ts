import { resolve } from 'node:path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Relative base path ('./') ensures universal compatibility for GitHub Actions,
// custom domains (amalgithub.in), and default GitHub Pages URLs.
export default defineConfig({
  plugins: [react()],
  base: './',
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        reception: resolve(__dirname, 'reception.html'),
      },
    },
  },
})
