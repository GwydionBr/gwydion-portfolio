import type { ScreenshotsSource } from '../../schema'
import { selfEngineScreenshots } from './self-engine'

/** Every Project's screenshots, by slug (the slug in `../projects.ts`). */
export const screenshots: ScreenshotsSource = { 'self-engine': selfEngineScreenshots }
