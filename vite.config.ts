import { defineConfig } from 'vite'
import { devtools } from '@tanstack/devtools-vite'
import { tanstackStart } from '@tanstack/react-start/plugin/vite'
import { nitro } from 'nitro/vite'
import viteReact from '@vitejs/plugin-react'
import { paraglideVitePlugin } from '@inlang/paraglide-js'
import { paraglideConfig } from './paraglide.config'

const config = defineConfig({
  resolve: { tsconfigPaths: true },
  server: {
    port: 3001,
  },
  plugins: [
    devtools(),
    tanstackStart(),
    paraglideVitePlugin(paraglideConfig),
    nitro(),
    viteReact(),
  ],
})

export default config
