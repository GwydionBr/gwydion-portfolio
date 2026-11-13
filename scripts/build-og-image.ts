// Builds the share image public/og-image.png from the Profile and the featured
// Projects, screenshotted by a headless Chromium (scripts/lib/headlessBrowser.ts).
// Run it after changing either:
//
//   bun run og:build
import path from 'node:path'
import { interFontUrl, repoFileUrl, rootDir, runHeadless } from './lib/headlessBrowser'
import { OG_HEIGHT, OG_WIDTH, renderOgImage } from './og/renderOgImage'

const pngPath = path.join(rootDir, 'public/og-image.png')
await runHeadless(
  renderOgImage({ font: interFontUrl, photo: repoFileUrl('public/portrait.webp') }),
  [`--window-size=${OG_WIDTH},${OG_HEIGHT}`, `--screenshot=${pngPath}`],
)
console.log(`Wrote ${path.relative(rootDir, pngPath)}`)
