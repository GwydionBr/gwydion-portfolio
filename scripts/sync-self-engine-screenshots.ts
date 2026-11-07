// Copies the Blob URLs of the Self-Engine screenshots this site shows out of the
// Self-Engine repo, which owns, captures and uploads them (its
// apps/web/src/marketing/screenshots/README.md): each screenshot in
// src/content/data/screenshots/self-engine.ts, in every Site language and theme, at both
// resolutions. Run it after the screenshots there are regenerated:
//
//   bun run screenshots:sync [path/to/self-engine]   (default: ../self-engine)
//
// When the Self-Engine repo lacks an expected file, it lists them, writes nothing and fails.
import { readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { selfEngineShots } from '../src/content/data/screenshots/self-engine'
import { pickScreenshotUrls } from '../src/content/screenshots'

const rootDir = path.resolve(import.meta.dirname, '..')
const selfEngineDir = path.resolve(process.argv[2] ?? path.join(rootDir, '../self-engine'))
const sourcePath = path.join(
  selfEngineDir,
  'apps/web/src/marketing/screenshots/screenshotUrls.json',
)
const targetPath = path.join(rootDir, 'src/content/data/screenshots/self-engine.urls.json')

const available = JSON.parse(await readFile(sourcePath, 'utf8')) as Record<string, string>
const { urls, missing } = pickScreenshotUrls(selfEngineShots, available)

if (missing.length > 0) {
  console.error(
    `${missing.length} screenshot(s) missing in ${sourcePath}:\n  ${missing.join('\n  ')}`,
  )
  process.exit(1)
}

await writeFile(targetPath, `${JSON.stringify(urls, null, 2)}\n`)
console.log(
  `Wrote ${Object.keys(urls).length} screenshot URLs to ${path.relative(rootDir, targetPath)}`,
)
