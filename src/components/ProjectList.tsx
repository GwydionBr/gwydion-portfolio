import { Link } from '@tanstack/react-router'
import type { Project } from '#/content'
import { useSiteLanguage } from '#/i18n/react'
import { ProjectMeta } from './ProjectMeta'
import { ProjectSwatch } from './ProjectSwatch'

/**
 * Projects as an ordered list of rows, each linking to its Project page:
 * title, kind, period and summary. The Projects view uses it.
 */
export function ProjectList({
  projects,
  label,
}: {
  projects: readonly Project[]
  /** The list's accessible name. */
  label: string
}) {
  const lang = useSiteLanguage()
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
                <h2 className="font-medium text-ink">{project.title}</h2>
                <span className="text-xs text-subtle">
                  <ProjectMeta project={project} />
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
