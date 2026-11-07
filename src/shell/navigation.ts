import { msg } from '@lingui/core/macro'
import type { MessageDescriptor } from '@lingui/core'
import { Article, EnvelopeSimple, SquaresFour, Stack, User, type Icon } from '@phosphor-icons/react'
import { usePosts } from '#/content/react'

/**
 * Every entry the app shell's navigation can show, in order: the desktop
 * sidebar and the phone tab bar both show exactly these.
 */
const NAVIGATION_ENTRIES = [
  { to: '/$lang', label: msg`Overview`, icon: SquaresFour, exact: true, needsPosts: false },
  { to: '/$lang/projects', label: msg`Projects`, icon: Stack, exact: false, needsPosts: false },
  { to: '/$lang/writing', label: msg`Writing`, icon: Article, exact: false, needsPosts: true },
  { to: '/$lang/about', label: msg`About`, icon: User, exact: false, needsPosts: false },
  {
    to: '/$lang/contact',
    label: msg`Contact`,
    icon: EnvelopeSimple,
    exact: false,
    needsPosts: false,
  },
] as const satisfies readonly {
  to: string
  label: MessageDescriptor
  icon: Icon
  /** Active only on exactly this path (the Overview), not on pages below it. */
  exact: boolean
  /** Shown only once at least one Post exists (Writing, spec #31). */
  needsPosts: boolean
}[]

export type NavigationEntry = (typeof NAVIGATION_ENTRIES)[number]

/** The navigation entries shown now: Writing only once a Post exists. */
export function useNavigationEntries(): NavigationEntry[] {
  const hasPosts = usePosts().length > 0
  return NAVIGATION_ENTRIES.filter((entry) => hasPosts || !entry.needsPosts)
}
