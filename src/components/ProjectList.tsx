import { useLingui } from '@lingui/react/macro'
import { Link } from '@tanstack/react-router'
import type { Project } from '#/content'
import { useSiteLanguage } from '#/i18n/react'
import { PROJECT_KIND_LABELS } from './projectKind'
import { ProjectSwatch } from './ProjectSwatch'

/**
 * Projects as an ordered list of rows, each linking to its Project page:
 * title, kind, years and summary. The Projects view and the Overview's
 * featured-Projects tile both use it.
 */
export function ProjectList({
  projects,
  label,
  headingLevel,
}: {
  projects: readonly Project[]
  /** The list's accessible name. */
  label: string
  /** The rank of each Project's title: 2 in a view, 3 inside a tile. */
  headingLevel: 2 | 3
}) {
  const { i18n } = useLingui()
  const lang = useSiteLanguage()
  const Heading = `h${headingLevel}` as const
  return (
    <ol aria-label={label} className="divide-y divide-line">
      {projects.map((project) => (
        <li key={project.slug}>
          <Link
            to="/$lang/projects/$slug"
            params={{ lang, slug: project.slug }}
            className="-mx-2 flex items-start gap-3 rounded-lg px-2 py-3 hover:bg-hover"
          >
            <ProjectSwatch accent={project.accent} className="mt-1.5" />
            <span className="min-w-0 flex-1">
              <span className="flex flex-wrap items-baseline justify-between gap-x-3">
                <Heading className="font-medium text-ink">{project.title}</Heading>
                <span className="text-xs text-subtle">
                  {i18n._(PROJECT_KIND_LABELS[project.kind])} · {project.years}
                </span>
              </span>
              <span className="mt-0.5 block">{project.summary}</span>
            </span>
          </Link>
        </li>
      ))}
    </ol>
  )
}
