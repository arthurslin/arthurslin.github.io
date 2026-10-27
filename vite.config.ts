import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/",
  build: {
    rollupOptions: {
      // One HTML entry per page.
      input: {
        main: "index.html",
        projects: "projects/index.html",
      },
    },
  },
})
