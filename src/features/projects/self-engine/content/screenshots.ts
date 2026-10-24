import * as m from '#/generated/paraglide/messages'
import type { Locale } from '#/generated/paraglide/runtime'
import screenshotUrls from './screenshotUrls.json'

/** CSS-pixel size of a whole-window screenshot. */
const WINDOW_SIZE = { width: 1440, height: 900 } as const

/**
 * Real Self-Engine screenshots, captured and hosted by the self-engine repo (Vercel
 * Blob, content-hashed URLs that never change; its
 * apps/web/src/marketing/screenshots/README.md). `screenshotUrls.json` holds the URLs
 * of the views listed here; `bun run screenshots:sync` refreshes it.
 *
 * A view is a whole 1440×900 CSS-pixel app window unless it declares a `size`: then it
 * is a close-up of one element (a panel, a widget), cut to that size — the
 * `APP_SCREENSHOT_CROPS` of the self-engine repo. Every file is stored at 2× with a 1×
 * copy (`-<width>w`), in each locale and color scheme.
 *
 * The order is the lightbox's: the page opens every screenshot in one gallery.
 */
export const SELF_ENGINE_SCREENSHOTS = [
  { view: 'dashboard', caption: m.cs_shot_dashboard, alt: m.cs_shot_dashboard_alt },
  {
    view: 'work-dashboard',
    size: { width: 932, height: 540 },
    caption: m.cs_shot_work,
    alt: m.cs_shot_work_alt,
  },
  {
    view: 'time-tracking-cockpit',
    size: { width: 440, height: 360 },
    caption: m.cs_shot_timer,
    alt: m.cs_shot_timer_alt,
  },
  {
    view: 'work-payout',
    size: { width: 472, height: 660 },
    caption: m.cs_shot_payout,
    alt: m.cs_shot_payout_alt,
  },
  { view: 'tasks-board', caption: m.cs_shot_tasks, alt: m.cs_shot_tasks_alt },
  { view: 'calendar', caption: m.cs_shot_calendar, alt: m.cs_shot_calendar_alt },
  { view: 'finance', caption: m.cs_shot_finance, alt: m.cs_shot_finance_alt },
  { view: 'habits', caption: m.cs_shot_habits, alt: m.cs_shot_habits_alt },
  {
    view: 'ai-assistant-panel',
    size: { width: 472, height: 760 },
    caption: m.cs_shot_ai,
    alt: m.cs_shot_ai_alt,
  },
] as const satisfies ReadonlyArray<{
  view: string
  size?: { width: number; height: number }
  caption: () => string
  alt: () => string
}>

export type SelfEngineScreenshot = (typeof SELF_ENGINE_SCREENSHOTS)[number]
export type SelfEngineScreenshotView = SelfEngineScreenshot['view']

export const SELF_ENGINE_SCREENSHOT_SCHEMES = ['light', 'dark'] as const
export type ScreenshotScheme = (typeof SELF_ENGINE_SCREENSHOT_SCHEMES)[number]

export function getScreenshot(view: SelfEngineScreenshotView): SelfEngineScreenshot {
  const shot = SELF_ENGINE_SCREENSHOTS.find((candidate) => candidate.view === view)
  if (!shot) throw new Error(`Unknown Self-Engine screenshot ${view}`)
  return shot
}

/** CSS-pixel size of `view`: its close-up size, or the whole window. */
export function screenshotSize(view: SelfEngineScreenshotView) {
  const shot = getScreenshot(view)
  return 'size' in shot ? shot.size : WINDOW_SIZE
}

export function screenshotFileNames(
  view: SelfEngineScreenshotView,
  locale: Locale,
  scheme: ScreenshotScheme,
) {
  const base = `${view}-${locale}-${scheme}`
  return { oneX: `${base}-${screenshotSize(view).width}w.webp`, twoX: `${base}.webp` }
}

function screenshotUrl(file: string) {
  const url = (screenshotUrls as Record<string, string | undefined>)[file]
  if (!url) throw new Error(`No URL for screenshot ${file}; run bun run screenshots:sync`)
  return url
}

export function screenshotSource(
  view: SelfEngineScreenshotView,
  locale: Locale,
  scheme: ScreenshotScheme,
) {
  const { oneX, twoX } = screenshotFileNames(view, locale, scheme)
  const { width } = screenshotSize(view)
  const oneXUrl = screenshotUrl(oneX)
  const twoXUrl = screenshotUrl(twoX)
  return {
    src: twoXUrl,
    srcSet: `${oneXUrl} ${width}w, ${twoXUrl} ${width * 2}w`,
    /** The 1× file alone, for small previews like lightbox thumbnails. */
    thumbSrc: oneXUrl,
  }
}
