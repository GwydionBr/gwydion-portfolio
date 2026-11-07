import { defineConfig } from '@lingui/conf'
import { formatter } from '@lingui/format-po'
import { BASE_LANGUAGE, LANGUAGES } from './src/i18n/language'

/**
 * The one message catalog of the site (ADR 0001, set up like Self-Engine's).
 * English, the Base language, is the source: its text is the message id, and
 * German falls back to it when a translation is missing.
 */
export default defineConfig({
  sourceLocale: BASE_LANGUAGE,
  locales: LANGUAGES,
  fallbackLocales: { default: BASE_LANGUAGE },
  catalogs: [
    {
      path: '<rootDir>/src/i18n/locales/{locale}',
      include: ['<rootDir>/src'],
      // Absolute like `include`: Lingui matches relative excludes against the cwd.
      exclude: ['<rootDir>/**/node_modules/**', '<rootDir>/**/*.test.*', '<rootDir>/**/*.d.ts'],
    },
  ],
  // Line numbers churn on every edit elsewhere in a file; keep diffs to real changes.
  format: formatter({ lineNumbers: false }),
})
