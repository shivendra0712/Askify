import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  server:{
    proxy: {
      "/auth": {
        target: "https://askify-backend-l0fk.onrender.com",
        changeOrigin: true,
        secure: false,
      },
    },
  },
  plugins: [react(),  tailwindcss(),],
})
