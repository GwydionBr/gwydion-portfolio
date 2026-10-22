// Copies the Blob URLs of the Self-Engine screenshots this site shows out of the
// self-engine repo, which owns, captures and uploads them (its
// apps/web/src/marketing/screenshots/README.md). Run it after the screenshots there
// are regenerated:
//
//   bun run screenshots:sync [path/to/self-engine]   (default: ../self-engine)
import { readFile, writeFile } from 'node:fs/promises'
import { resolve } from 'node:path'
import { locales } from '../src/generated/paraglide/runtime'
import {
  SELF_ENGINE_SCREENSHOT_SCHEMES,
  SELF_ENGINE_SCREENSHOTS,
  screenshotFileNames,
} from '../src/features/projects/self-engine/content/screenshots'

const selfEngineDir = resolve(process.argv[2] ?? '../self-engine')
const sourcePath = resolve(selfEngineDir, 'apps/web/src/marketing/screenshots/screenshotUrls.json')
const targetPath = resolve('src/features/projects/self-engine/content/screenshotUrls.json')

const source: Record<string, string> = JSON.parse(await readFile(sourcePath, 'utf8'))

const urls: Record<string, string> = {}
const missing: string[] = []
for (const { view } of SELF_ENGINE_SCREENSHOTS) {
  for (const locale of locales) {
    for (const scheme of SELF_ENGINE_SCREENSHOT_SCHEMES) {
      const files = screenshotFileNames(view, locale, scheme)
      for (const file of [files.oneX, files.twoX]) {
        const url = source[file]
        if (url) urls[file] = url
        else missing.push(file)
      }
    }
  }
}

if (missing.length > 0) {
  console.error(`Missing in ${sourcePath}:\n  ${missing.join('\n  ')}`)
  process.exit(1)
}

await writeFile(targetPath, `${JSON.stringify(urls, null, 2)}\n`)
console.log(`Wrote ${Object.keys(urls).length} screenshot URLs to ${targetPath}`)
