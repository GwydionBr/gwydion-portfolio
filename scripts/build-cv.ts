// Builds the CV PDFs in public/cv/ (one per Site language) from the content
// data plus the CV's own texts (scripts/cv/cvText.ts), printed by a headless
// Chromium (scripts/lib/headlessBrowser.ts). Run it after changing either:
//
//   bun run cv:build
import { readFile } from 'node:fs/promises'
import path from 'node:path'
import { LANGUAGES } from '../src/i18n/language'
import { renderCv } from './cv/renderCv'
import { interFontUrl, repoFileUrl, rootDir, runHeadless } from './lib/headlessBrowser'

const assets = { font: interFontUrl, photo: repoFileUrl('public/portrait.webp') }

for (const language of LANGUAGES) {
  const pdfPath = path.join(rootDir, `public/cv/gwydion-braunsdorf-cv-${language}.pdf`)
  await runHeadless(renderCv(language, assets), [
    '--no-pdf-header-footer',
    `--print-to-pdf=${pdfPath}`,
  ])
  // The CV is laid out for one page; content that no longer fits spills onto a second.
  const pages = (await readFile(pdfPath, 'latin1')).match(/\/Type\s*\/Page\b/g)?.length ?? 0
  if (pages !== 1) {
    console.error(`${path.relative(rootDir, pdfPath)} has ${pages} pages; shorten it to one.`)
    process.exit(1)
  }
  console.log(`Wrote ${path.relative(rootDir, pdfPath)}`)
}
