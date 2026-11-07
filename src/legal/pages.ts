import { msg } from '@lingui/core/macro'
import type { MessageDescriptor } from '@lingui/core'
import type { LegalDocument } from './document'
import { IMPRESSUM } from './impressum'
import { PRIVACY } from './privacy'

/** A legal page: where it lives, its title (also its link label) and its text. */
export interface LegalPageDefinition {
  to: '/$lang/impressum' | '/$lang/datenschutz'
  title: MessageDescriptor
  document: LegalDocument
  /** Lists the sections at the top, linked to their anchors (for long texts). */
  withContents: boolean
}

/** The legal pages, in the order the shell links to them. */
export const LEGAL_PAGES = [
  { to: '/$lang/impressum', title: msg`Legal notice`, document: IMPRESSUM, withContents: false },
  { to: '/$lang/datenschutz', title: msg`Privacy policy`, document: PRIVACY, withContents: true },
] as const satisfies readonly LegalPageDefinition[]

export const [IMPRESSUM_PAGE, PRIVACY_PAGE] = LEGAL_PAGES
