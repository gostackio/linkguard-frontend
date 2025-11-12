import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    proxy: {
      '/api': {
        target: 'https://linkguard-api-733656195503.us-central1.run.app',
        changeOrigin: true,
      }
    }
  }
})
