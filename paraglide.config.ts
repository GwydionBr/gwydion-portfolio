import type { CompilerOptions } from '@inlang/paraglide-js'

export const paraglideConfig = {
  project: './project.inlang',
  outdir: './src/generated/paraglide',
  isServer: 'import.meta.env.SSR',
  // Locale is fully determined by the URL; deliberately no client-side persistence keeps crawling deterministic and avoids a settings cookie.
  strategy: ['url', 'baseLocale'],
} satisfies CompilerOptions
