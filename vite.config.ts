import { defineConfig, lazyPlugins } from 'vite-plus'
import { devtools } from '@tanstack/devtools-vite'
import { tanstackStart } from '@tanstack/react-start/plugin/vite'
import { nitro } from 'nitro/vite'
import viteReact from '@vitejs/plugin-react'
import { paraglideVitePlugin } from '@inlang/paraglide-js'
import { paraglideConfig } from './paraglide.config'

// Generated sources are owned by their generators, never by fmt/lint.
const generatedFiles = ['src/routeTree.gen.ts', 'src/generated/**']

const config = defineConfig({
  resolve: { tsconfigPaths: true },
  server: {
    port: 3001,
  },
  plugins: lazyPlugins(() => [
    devtools(),
    tanstackStart(),
    paraglideVitePlugin(paraglideConfig),
    // Nitro's dev server keeps Vitest from exiting; tests don't need a server runtime.
    ...(process.env.VITEST ? [] : [nitro()]),
    viteReact(),
  ]),
  test: {
    include: ['src/**/*.test.{ts,tsx}'],
  },
  fmt: {
    singleQuote: true,
    semi: false,
    ignorePatterns: generatedFiles,
  },
  lint: {
    ignorePatterns: generatedFiles,
    jsPlugins: [
      {
        name: 'vite-plus',
        specifier: 'vite-plus/oxlint-plugin',
      },
    ],
    rules: {
      'no-unused-vars': 'warn',
      'no-console': 'off',
      'vite-plus/prefer-vite-plus-imports': 'error',
    },
    env: {
      browser: true,
      es2022: true,
    },
    options: {
      typeAware: true,
      typeCheck: true,
    },
  },
  staged: {
    '*': 'vp check --fix',
  },
})

export default config
