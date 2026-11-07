import { msg } from '@lingui/core/macro'
import type { MessageDescriptor } from '@lingui/core'
import { Article, EnvelopeSimple, SquaresFour, Stack, User, type Icon } from '@phosphor-icons/react'
import { useHasWriting } from '#/content/react'

/**
 * Every entry the app shell's navigation can show, in order: the desktop
 * sidebar and the phone tab bar both show exactly these.
 */
const NAVIGATION_ENTRIES = [
  { to: '/$lang', label: msg`Overview`, icon: SquaresFour, exact: true, needsWriting: false },
  { to: '/$lang/projects', label: msg`Projects`, icon: Stack, exact: false, needsWriting: false },
  { to: '/$lang/writing', label: msg`Writing`, icon: Article, exact: false, needsWriting: true },
  { to: '/$lang/about', label: msg`About`, icon: User, exact: false, needsWriting: false },
  {
    to: '/$lang/contact',
    label: msg`Contact`,
    icon: EnvelopeSimple,
    exact: false,
    needsWriting: false,
  },
] as const satisfies readonly {
  to: string
  label: MessageDescriptor
  icon: Icon
  /** Active only on exactly this path (the Overview), not on pages below it. */
  exact: boolean
  /** Shown only while Writing exists (`Content.hasWriting`). */
  needsWriting: boolean
}[]

export type NavigationEntry = (typeof NAVIGATION_ENTRIES)[number]

/** The navigation entries shown while `hasWriting`: Writing only once it exists. */
export function navigationEntriesFor(hasWriting: boolean): NavigationEntry[] {
  return NAVIGATION_ENTRIES.filter((entry) => hasWriting || !entry.needsWriting)
}

/** The navigation entries shown now. The sitemap lists the same pages (src/seo/buildSitemap.ts). */
export function useNavigationEntries(): NavigationEntry[] {
  return navigationEntriesFor(useHasWriting())
}
