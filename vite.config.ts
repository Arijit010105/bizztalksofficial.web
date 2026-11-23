import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// base './' keeps asset paths relative so the build works on any host or sub-path.
export default defineConfig({
  base: './',
  plugins: [react()],
  // the 3D scene (three.js) is lazy-loaded in its own chunk, so it never blocks first paint
  build: { chunkSizeWarningLimit: 1000 },
})
