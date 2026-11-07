import { msg } from '@lingui/core/macro'
import type { MessageDescriptor } from '@lingui/core'
import { EnvelopeSimple, SquaresFour, Stack, User, type Icon } from '@phosphor-icons/react'

/**
 * The entries of the app shell's navigation, in order: the desktop sidebar
 * and the phone tab bar both show exactly these. Writing joins once the first
 * Post exists (spec #31).
 */
export const NAVIGATION_ENTRIES = [
  { to: '/$lang', label: msg`Overview`, icon: SquaresFour, exact: true },
  { to: '/$lang/projects', label: msg`Projects`, icon: Stack, exact: false },
  { to: '/$lang/about', label: msg`About`, icon: User, exact: false },
  { to: '/$lang/contact', label: msg`Contact`, icon: EnvelopeSimple, exact: false },
] as const satisfies readonly {
  to: string
  label: MessageDescriptor
  icon: Icon
  /** Active only on exactly this path (the Overview), not on pages below it. */
  exact: boolean
}[]
