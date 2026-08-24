import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  // GitHub Pages serves this project at /portfolio/ until a custom domain is
  // attached (a custom domain serves from root — set this back to '/' then).
  base: '/portfolio/',
  plugins: [react(), tailwindcss()],
})
