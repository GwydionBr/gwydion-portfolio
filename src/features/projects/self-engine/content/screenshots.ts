import * as m from '#/generated/paraglide/messages'
import type { Locale } from '#/generated/paraglide/runtime'
import screenshotUrls from './screenshotUrls.json'

/**
 * Real Self-Engine screenshots, captured and hosted by the self-engine repo (Vercel
 * Blob, content-hashed URLs that never change). `screenshotUrls.json` holds the URLs
 * of the views listed here; `bun run screenshots:sync` refreshes it.
 *
 * Every view is a whole 1440×900 CSS-pixel app window, stored at 2× with a 1× copy
 * (`-1440w`), in each locale and color scheme.
 */
export const SELF_ENGINE_SCREENSHOTS = [
  { view: 'dashboard', caption: m.cs_shot_dashboard, alt: m.cs_shot_dashboard_alt },
  { view: 'calendar', caption: m.cs_shot_calendar, alt: m.cs_shot_calendar_alt },
  { view: 'tasks-board', caption: m.cs_shot_tasks, alt: m.cs_shot_tasks_alt },
  { view: 'finance', caption: m.cs_shot_finance, alt: m.cs_shot_finance_alt },
  { view: 'projects', caption: m.cs_shot_projects, alt: m.cs_shot_projects_alt },
] as const

export type SelfEngineScreenshot = (typeof SELF_ENGINE_SCREENSHOTS)[number]
type View = SelfEngineScreenshot['view']

export const SELF_ENGINE_SCREENSHOT_SCHEMES = ['light', 'dark'] as const
export type ScreenshotScheme = (typeof SELF_ENGINE_SCREENSHOT_SCHEMES)[number]

/** CSS-pixel size of a whole-window screenshot. */
export const SELF_ENGINE_SCREENSHOT_SIZE = { width: 1440, height: 900 } as const

export function screenshotFileNames(view: View, locale: Locale, scheme: ScreenshotScheme) {
  const base = `${view}-${locale}-${scheme}`
  return { oneX: `${base}-${SELF_ENGINE_SCREENSHOT_SIZE.width}w.webp`, twoX: `${base}.webp` }
}

function screenshotUrl(file: string) {
  const url = (screenshotUrls as Record<string, string | undefined>)[file]
  if (!url) throw new Error(`No URL for screenshot ${file}; run bun run screenshots:sync`)
  return url
}

export function screenshotSource(view: View, locale: Locale, scheme: ScreenshotScheme) {
  const { oneX, twoX } = screenshotFileNames(view, locale, scheme)
  const { width } = SELF_ENGINE_SCREENSHOT_SIZE
  const twoXUrl = screenshotUrl(twoX)
  return {
    src: twoXUrl,
    srcSet: `${screenshotUrl(oneX)} ${width}w, ${twoXUrl} ${width * 2}w`,
  }
}
