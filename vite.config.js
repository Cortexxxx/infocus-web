import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import basicSsl from '@vitejs/plugin-basic-ssl'
import path from 'path'
import { fileURLToPath } from 'url'

// Воссоздаем __dirname для ES-модулей
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export default defineConfig({
  plugins: [
    react(),
    basicSsl()
  ],
  server: {
    https: true
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'), // Настраиваем @ как ссылку на папку src
    },
  }, 
})