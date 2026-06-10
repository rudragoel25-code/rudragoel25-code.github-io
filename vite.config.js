import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // Since this is deployed to username.github.io/repo-name sometimes, or just the root, 
  // setting the base to relative or / is good. For Github Pages, base: './' works very well.
  base: './',
})
