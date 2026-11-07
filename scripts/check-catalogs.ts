// The catalog gate, run by `bun run check`: fails when the catalogs are out of
// sync with the source (an orphaned or unextracted message), when a Site
// language misses a translation, when a translation's placeholders differ from
// its message, or when a text is not valid ICU. Ported from Self-Engine's
// `packages/i18n/scripts/check-catalogs.ts`.
import { spawnSync } from 'node:child_process'
import { readFile } from 'node:fs/promises'
import path from 'node:path'
import type { CatalogFormatter } from '@lingui/conf'
import config from '../lingui.config'
import { checkCatalogs, type CatalogEntry } from '../src/i18n/catalog-check'

const rootDir = path.resolve(import.meta.dirname, '..')
const format = config.format as CatalogFormatter

async function readCatalog(locale: string): Promise<CatalogEntry[]> {
  const filename = path.join(rootDir, `src/i18n/locales/${locale}.po`)
  const catalog = await format.parse(await readFile(filename, 'utf8'), {
    locale,
    sourceLocale: config.sourceLocale ?? 'en',
    filename,
  })
  return Object.entries(catalog).map(([key, { message, context, translation = '' }]) => ({
    message: message ?? key,
    context,
    translation,
  }))
}

const sync = spawnSync('bun', ['x', 'lingui', 'check', 'sync'], { cwd: rootDir, stdio: 'inherit' })

const catalogs = Object.fromEntries(
  await Promise.all(config.locales.map(async (locale) => [locale, await readCatalog(locale)])),
)
const errors = checkCatalogs({ catalogs })

for (const error of errors) console.error(`error ${error}`)

if (sync.status !== 0) {
  console.error('Catalogs are out of sync with the source: run `bun run i18n:extract`.')
}
if (sync.status !== 0 || errors.length > 0) process.exit(1)
console.log(`i18n catalogs OK (${config.locales.join(', ')})`)
