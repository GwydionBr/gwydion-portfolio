import { BASE_LANGUAGE, LANGUAGES, type Language } from '#/i18n/language'
import type { Content } from './index'

/**
 * Everything `content` returns in `language`, keyed by getter; each Project
 * page as `project.<slug>`, so a missing story is reported by slug. New
 * content types join here.
 */
function everythingIn(content: Content, language: Language) {
  const projects = content.getProjects(language)
  return {
    profile: content.getProfile(language),
    projects,
    ...Object.fromEntries(
      projects.map(({ slug }) => [`project.${slug}`, content.getProject(slug, language)]),
    ),
    posts: content.getPosts(),
  }
}

/** What the Projects as a whole must satisfy: unique slugs, and something to feature and pin. */
function projectProblems(content: Content): string[] {
  const problems: string[] = []
  const projects = content.getProjects(BASE_LANGUAGE)
  const seen = new Set<string>()
  for (const { slug } of projects) {
    if (seen.has(slug)) problems.push(`projects: slug "${slug}" is not unique`)
    seen.add(slug)
  }
  if (!projects.some((project) => project.featured)) problems.push('projects: none is featured')
  if (!projects.some((project) => project.pinned)) problems.push('projects: none is pinned')
  return problems
}

/**
 * The content-integrity check (spec #31, test seam 2): walks everything the
 * content module returns, in every Site language, and reports each text (or
 * story) that is absent or empty, as `"de: profile.pitch is empty"`. `null`
 * marks a value left out on purpose and is fine. Then it checks the
 * invariants across Projects (`projectProblems`).
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
  return [...problems, ...projectProblems(content)]
}
