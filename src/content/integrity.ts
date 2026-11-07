import { LANGUAGES, type Language } from '#/i18n/language'
import type { Content } from './index'

/** Everything `content` returns in `language`, keyed by getter. New content types join here. */
function everythingIn(content: Content, language: Language) {
  return {
    profile: content.getProfile(language),
    posts: content.getPosts(),
  }
}

/**
 * The content-integrity check (spec #31, test seam 2): walks everything the
 * content module returns, in every Site language, and reports each text that
 * is absent or empty, as `"de: profile.pitch is empty"`. `null` marks a value
 * left out on purpose and is fine.
 */
export function integrityProblems(content: Content): string[] {
  const problems: string[] = []
  const walk = (language: Language, value: unknown, path: string) => {
    if (value === undefined) problems.push(`${language}: ${path} is missing`)
    else if (typeof value === 'string' && value.trim() === '')
      problems.push(`${language}: ${path} is empty`)
    else if (value !== null && typeof value === 'object')
      for (const [key, field] of Object.entries(value)) walk(language, field, `${path}.${key}`)
  }
  for (const language of LANGUAGES)
    for (const [key, value] of Object.entries(everythingIn(content, language)))
      walk(language, value, key)
  return problems
}
