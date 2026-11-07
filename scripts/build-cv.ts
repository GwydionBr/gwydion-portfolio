// Builds the CV PDFs in public/cv/ (one per Site language) from the content
// data plus the CV's own texts (scripts/cv/cvText.ts), printed by a headless
// Chromium. Run it after changing either:
//
//   bun run cv:build
//
// The browser defaults to Helium; point CHROME at any Chromium-based browser.
import { spawnSync } from 'node:child_process'
import { mkdtemp, readFile, writeFile } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import path from 'node:path'
import { pathToFileURL } from 'node:url'
import { LANGUAGES } from '../src/i18n/language'
import { renderCv } from './cv/renderCv'

const rootDir = path.resolve(import.meta.dirname, '..')
const chrome = process.env.CHROME ?? '/Applications/Helium.app/Contents/MacOS/Helium'
const assets = {
  font: pathToFileURL(
    path.join(
      rootDir,
      'node_modules/@fontsource-variable/inter/files/inter-latin-wght-normal.woff2',
    ),
  ).href,
  photo: pathToFileURL(path.join(rootDir, 'public/portrait.webp')).href,
}
const workDir = await mkdtemp(path.join(tmpdir(), 'cv-'))

for (const language of LANGUAGES) {
  const htmlPath = path.join(workDir, `cv-${language}.html`)
  const pdfPath = path.join(rootDir, `public/cv/gwydion-braunsdorf-cv-${language}.pdf`)
  await writeFile(htmlPath, renderCv(language, assets))
  const browser = spawnSync(chrome, [
    '--headless',
    '--disable-gpu',
    '--no-pdf-header-footer',
    `--user-data-dir=${path.join(workDir, 'profile')}`,
    `--print-to-pdf=${pdfPath}`,
    pathToFileURL(htmlPath).href,
  ])
  if (browser.status !== 0) {
    console.error(browser.error ?? browser.stderr.toString())
    process.exit(1)
  }
  // The CV is laid out for one page; content that no longer fits spills onto a second.
  const pages = (await readFile(pdfPath, 'latin1')).match(/\/Type\s*\/Page\b/g)?.length ?? 0
  if (pages !== 1) {
    console.error(`${path.relative(rootDir, pdfPath)} has ${pages} pages; shorten it to one.`)
    process.exit(1)
  }
  console.log(`Wrote ${path.relative(rootDir, pdfPath)}`)
}
