import { useLingui } from '@lingui/react/macro'
import { Link } from '@tanstack/react-router'
import { ProjectSwatch } from '#/components/ProjectSwatch'
import { useProjects } from '#/content/react'
import { useSiteLanguage } from '#/i18n/react'

/** The sidebar's pinned Projects, each linking to its Project page. Hidden when none is pinned. */
export function PinnedProjects() {
  const { t } = useLingui()
  const lang = useSiteLanguage()
  const pinned = useProjects({ pinned: true })
  if (pinned.length === 0) return null
  return (
    <nav aria-label={t`Pinned Projects`} className="mt-6">
      <p aria-hidden className="mb-1 px-3 text-xs font-medium text-subtle">{t`Pinned`}</p>
      <ul className="space-y-0.5">
        {pinned.map((project) => (
          <li key={project.slug}>
            <Link
              to="/$lang/projects/$slug"
              params={{ lang, slug: project.slug }}
              className="flex w-full items-center gap-3 rounded-lg px-3 py-1.5 hover:bg-hover aria-[current=page]:bg-selected aria-[current=page]:font-medium aria-[current=page]:text-ink"
            >
              <ProjectSwatch accent={project.accent} className="mx-[3px]" />
              <span className="truncate">{project.title}</span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}
