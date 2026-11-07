import { parse, type Token } from '@messageformat/parser'

/** One message of a language's catalog (its English source text) and its translation. */
export type CatalogEntry = {
  message: string
  context?: string
  /** Empty while the message is untranslated. */
  translation: string
}

export interface CatalogCheckInput {
  /** The catalog of every Site language, by language tag. */
  catalogs: Record<string, CatalogEntry[]>
}

/**
 * The problems that fail `bun run check`: a message missing in any Site
 * language (German falls back to English at runtime, but must never ship
 * that way), a text that is not valid ICU, or a translation whose
 * placeholders (arguments and numbered rich-text tags) differ from its
 * message's. Ported from Self-Engine's `packages/i18n/src/catalog-check.ts`;
 * every Site language is required, so there are no warnings.
 */
export function checkCatalogs({ catalogs }: CatalogCheckInput): string[] {
  const errors: string[] = []

  for (const [language, entries] of Object.entries(catalogs)) {
    for (const { message, context, translation } of entries) {
      const label = `${language}: "${message}"${context ? ` (${context})` : ''}`

      if (!translation) {
        errors.push(`${label} is not translated`)
        continue
      }

      const expected = placeholdersOf(message)
      const actual = placeholdersOf(translation)
      if (typeof expected === 'string') {
        errors.push(`${label} is not valid ICU: ${expected}`)
      } else if (typeof actual === 'string') {
        errors.push(`${label} is not valid ICU: ${actual}`)
      } else if (expected.join() !== actual.join()) {
        errors.push(
          `${label} has placeholders ${listed(actual)}, the message has ${listed(expected)}`,
        )
      }
    }
  }

  return errors
}

/** The sorted placeholders of an ICU text, or the parse error. */
function placeholdersOf(text: string): string[] | string {
  let tokens: Token[]
  try {
    tokens = parse(text)
  } catch (error) {
    return error instanceof Error ? error.message : String(error)
  }

  const found = new Set<string>()
  const visit = (list: Token[]) => {
    for (const token of list) {
      if (token.type === 'content') {
        for (const [tag] of token.value.matchAll(/<\d+>/g)) found.add(tag)
      } else if (token.type === 'argument' || token.type === 'function') {
        found.add(`{${token.arg}}`)
      } else if (token.type !== 'octothorpe') {
        found.add(`{${token.arg}}`)
        for (const { tokens: caseTokens } of token.cases) visit(caseTokens)
      }
    }
  }
  visit(tokens)
  return [...found].sort()
}

function listed(placeholders: string[]): string {
  return placeholders.length ? placeholders.join(', ') : '(none)'
}
