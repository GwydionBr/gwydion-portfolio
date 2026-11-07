import { BASE_LANGUAGE, LANGUAGES, type Language } from '#/i18n/language'
import { newestFirst, periodProblem } from './career'
import type { Content } from './index'

/**
 * Everything `content` returns in `language`, keyed by getter; each Project
 * page as `project.<slug>`, so a missing story is reported by slug, and its
 * screenshots as `screenshots.<slug>.<view>`, so a missing image file is
 * reported by view and theme. New
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
    ...Object.fromEntries(
      projects.map(({ slug }) => [
        `screenshots.${slug}`,
        Object.fromEntries(content.getScreenshots(slug, language).map((shot) => [shot.view, shot])),
      ]),
    ),
    careerEntries: content.getCareerEntries(language),
    cv: content.getCv(language),
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

/** Each Career entry's period must be well-formed, and the entries newest first. */
function careerProblems(content: Content, language: Language): string[] {
  const entries = content.getCareerEntries(language)
  return entries.flatMap((entry, index) => {
    const problems: string[] = []
    const problem = periodProblem(entry)
    if (problem) problems.push(`${language}: careerEntries.${index} ${problem}`)
    const previous = entries[index - 1]
    if (previous && newestFirst(previous, entry) > 0)
      problems.push(`${language}: careerEntries.${index} is newer than the entry before it`)
    return problems
  })
}

/**
 * The content-integrity check (spec #31, test seam 2): walks everything the
 * content module returns, in every Site language, and reports each text (or
 * story) that is absent or empty, as `"de: profile.pitch is empty"`. `null`
 * marks a value left out on purpose and is fine. It also reports Career entry
 * periods that are malformed or out of order, and breaches of the invariants
 * across Projects (`projectProblems`).
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
  for (const language of LANGUAGES) problems.push(...careerProblems(content, language))
  return [...problems, ...projectProblems(content)]
}

/**
 * The static assets the content points at that do not exist: the CV each
 * Site language offers. `assetExists` answers for a URL path such as
 * `/cv/….pdf` (in tests: is the file in `public/`).
 */
export function assetProblems(content: Content, assetExists: (href: string) => boolean): string[] {
  return LANGUAGES.flatMap((language) => {
    const { href } = content.getCv(language)
    return assetExists(href) ? [] : [`${language}: cv ${href} does not exist`]
  })
}
