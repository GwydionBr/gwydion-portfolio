import { defineConfig, lazyPlugins } from 'vite-plus'
import { lingui } from '@lingui/vite-plugin'
import tailwindcss from '@tailwindcss/vite'
import { tanstackStart } from '@tanstack/react-start/plugin/vite'
import { nitro } from 'nitro/vite'
import viteReact from '@vitejs/plugin-react'

// Generated sources are owned by their generators, never by fmt/lint.
const generatedFiles = ['src/routeTree.gen.ts', 'src/i18n/locales/*.po']

const config = defineConfig({
  resolve: { tsconfigPaths: true },
  server: {
    port: 3001,
  },
  plugins: lazyPlugins(() => [
    // Compiles the Lingui macros (`useLingui`, `<Trans>`, `msg`) to message ids
    // and `.po` catalogs to modules on import (lingui.config.ts).
    lingui({ macroTransform: true, failOnCompileError: true }),
    tailwindcss(),
    tanstackStart(),
    // Nitro's dev server keeps Vitest from exiting; tests don't need a server runtime.
    // Functions run in Frankfurt so contact-form data stays in the EU, as the privacy policy states.
    ...(process.env.VITEST ? [] : [nitro({ vercel: { functions: { regions: ['fra1'] } } })]),
    viteReact(),
  ]),
  test: {
    projects: [
      {
        extends: true,
        test: {
          name: 'unit',
          include: ['src/**/*.test.{ts,tsx}'],
          exclude: ['src/**/*.dom.test.{ts,tsx}'],
        },
      },
      {
        // The "URL in, page out" seam: the real route tree in a DOM (src/test/visit.tsx).
        extends: true,
        test: {
          name: 'dom',
          include: ['src/**/*.dom.test.{ts,tsx}'],
          environment: 'jsdom',
        },
      },
    ],
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
