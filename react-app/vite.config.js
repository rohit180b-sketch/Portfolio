import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

export default ({ mode }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) }

  return defineConfig({
    base: process.env.VITE_BASE || '/',
    plugins: [react()],
    server: {
      host: process.env.VITE_HOST || 'localhost'
    }
  })
}
