import { useLingui } from '@lingui/react/macro'
import { Link } from '@tanstack/react-router'
import type { Project } from '#/content'
import { useSiteLanguage } from '#/i18n/react'
import { ProjectMeta } from './ProjectMeta'
import { ProjectSwatch } from './ProjectSwatch'
import { TagList } from './TagList'

/** How many of its stack a Project card names. */
const CARD_STACK = 4

/**
 * Projects as cards, two columns on wide screens: title, kind and period,
 * summary, the Project's numbers if it has any, and the start of its stack.
 * Each card links to its Project page. The Overview's featured Projects.
 */
export function ProjectCards({ projects }: { projects: readonly Project[] }) {
  return (
    <ul className="grid gap-4 lg:grid-cols-2">
      {projects.map((project) => (
        <li key={project.slug}>
          <ProjectCard project={project} />
        </li>
      ))}
    </ul>
  )
}

function ProjectCard({ project }: { project: Project }) {
  const { t } = useLingui()
  const lang = useSiteLanguage()
  return (
    // The title link covers the whole card; the card's lists stay plain content.
    <article className="relative flex h-full flex-col rounded-2xl bg-surface p-5 ring-1 ring-line hover:bg-hover">
      <p className="flex items-center gap-2 text-xs text-subtle">
        <ProjectSwatch accent={project.accent} />
        <span>
          <ProjectMeta project={project} />
        </span>
      </p>
      <h3 className="mt-2 text-base font-semibold tracking-tight text-ink">
        <Link
          to="/$lang/projects/$slug"
          params={{ lang, slug: project.slug }}
          className="after:absolute after:inset-0 after:rounded-2xl"
        >
          {project.title}
        </Link>
      </h3>
      <p className="mt-1 leading-relaxed">{project.summary}</p>
      {project.stats && (
        <ul aria-label={t`Numbers`} className="mt-4 flex flex-wrap gap-x-6 gap-y-2">
          {project.stats.map((stat) => (
            <li key={stat.label} className="flex items-baseline gap-1.5">
              <span className="text-lg font-semibold tracking-tight text-ink tabular-nums">
                {stat.value}
              </span>
              <span className="text-xs text-subtle">{stat.label}</span>
            </li>
          ))}
        </ul>
      )}
      <TagList
        label={t`Stack`}
        tags={project.stack.slice(0, CARD_STACK)}
        className="mt-auto pt-4"
      />
    </article>
  )
}
