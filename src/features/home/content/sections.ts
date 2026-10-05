import * as m from '#/generated/paraglide/messages'

/** In-page sections of the home one-pager, in scroll order. Drives the sidebar nav. */
export const HOME_SECTION_LABELS = {
  about: m.home_nav_about,
  highlights: m.home_nav_highlights,
  projects: m.home_nav_projects,
  now: m.home_nav_now,
  contact: m.nav_contact,
} as const

export type HomeSectionId = keyof typeof HOME_SECTION_LABELS

export const HOME_SECTION_IDS = Object.keys(HOME_SECTION_LABELS) as HomeSectionId[]
