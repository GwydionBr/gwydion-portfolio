import type { Localized } from '#/content/localized'
import type { Language } from '#/i18n/language'

/** One titled section of a legal text; `id` doubles as its anchor on the page. */
export interface LegalSection {
  id: string
  title: string
  /** Plain text; bare URLs are rendered as links. */
  paragraphs: readonly string[]
}

/** A legal text (Impressum, privacy policy) in every Site language, section by section. */
export type LegalDocument = Localized<readonly LegalSection[]>

/**
 * The Site language whose version of a legal text is legally binding. The
 * other languages are courtesy translations, and their pages say so.
 */
export const BINDING_LANGUAGE: Language = 'de'
