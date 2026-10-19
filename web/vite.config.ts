import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // During development, requests to /api go to the API server (api/).
    proxy: { '/api': 'http://localhost:3000' },
  },
})
