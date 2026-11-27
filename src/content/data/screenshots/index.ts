import type { ScreenshotsSource } from '../../schema'
import { selfEngineScreenshots } from './self-engine'
import { tattooBookingPortalScreenshots } from './tattoo-booking-portal'
import { tattooSitesScreenshots } from './tattoo-sites'

/** Every Project's screenshots, by slug (the slug in `../projects.ts`). */
export const screenshots: ScreenshotsSource = {
  'self-engine': selfEngineScreenshots,
  'tattoo-sites': tattooSitesScreenshots,
  'tattoo-booking-portal': tattooBookingPortalScreenshots,
}
