import { defineConfig } from 'vite'
import { devtools } from '@tanstack/devtools-vite'
import { tanstackStart } from '@tanstack/react-start/plugin/vite'
import viteReact from '@vitejs/plugin-react'

const config = defineConfig({
  resolve: { tsconfigPaths: true },
  server: {
    port: 3001,
  },
  plugins: [
    devtools(),
    tanstackStart(),
    viteReact(),
  ],
})

export default config
