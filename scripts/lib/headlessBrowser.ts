// The headless Chromium the build scripts print and screenshot with.
// Defaults to Helium; point CHROME at any Chromium-based browser.
import { spawnSync } from 'node:child_process'
import { mkdtemp, writeFile } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import path from 'node:path'
import { pathToFileURL } from 'node:url'

export const rootDir = path.resolve(import.meta.dirname, '../..')
const chrome = process.env.CHROME ?? '/Applications/Helium.app/Contents/MacOS/Helium'

/** A file in the repo as a URL the browser can load. */
export const repoFileUrl = (relativePath: string) =>
  pathToFileURL(path.join(rootDir, relativePath)).href

/** Inter, the site's typeface, as a loadable font file. */
export const interFontUrl = repoFileUrl(
  'node_modules/@fontsource-variable/inter/files/inter-latin-wght-normal.woff2',
)

const workDir = await mkdtemp(path.join(tmpdir(), 'headless-'))

/**
 * Opens `html` in the headless browser with `flags` (such as `--print-to-pdf=…`
 * or `--screenshot=…`); exits the process when the browser fails.
 */
export async function runHeadless(html: string, flags: string[]) {
  const htmlPath = path.join(workDir, `page-${Date.now()}.html`)
  await writeFile(htmlPath, html)
  const browser = spawnSync(chrome, [
    '--headless',
    '--disable-gpu',
    '--hide-scrollbars',
    `--user-data-dir=${path.join(workDir, 'profile')}`,
    ...flags,
    pathToFileURL(htmlPath).href,
  ])
  if (browser.status !== 0) {
    console.error(browser.error ?? browser.stderr.toString())
    process.exit(1)
  }
}
