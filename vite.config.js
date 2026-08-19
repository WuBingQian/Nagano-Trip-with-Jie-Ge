import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// base: './' keeps every asset path relative, so the built site works on
// GitHub Pages at any repo path (e.g. /Nagano-Trip-with-Jie-Ge/) without edits.
export default defineConfig({
  plugins: [react()],
  base: './',
})
