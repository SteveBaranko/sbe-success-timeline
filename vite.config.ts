import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
// base must match your GitHub repo name for project pages:
// https://<username>.github.io/<repo-name>/
export default defineConfig({
  plugins: [react()],
  base: '/sbe-success-timeline/',
})
