import { useLingui } from '@lingui/react/macro'
import { Link } from '@tanstack/react-router'
import type { CareerEntry } from '#/content'
import { useContent } from '#/content/react'
import { useSiteLanguage } from '#/i18n/react'
import { PeriodText } from './PeriodText'

/**
 * Career entries in the order given, each with period, title, organisation
 * and summary, and a link to the Project it was about.
 */
export function CareerList({ entries }: { entries: readonly CareerEntry[] }) {
  return (
    <ol className="mt-2">
      {entries.map((entry) => (
        <li
          key={`${entry.start}-${entry.organisation}`}
          className={`grid gap-1 border-b border-line py-3 last:border-0 sm:grid-cols-[8rem_1fr] sm:gap-4 ${entry.placeholder ? 'stand-in' : ''}`}
        >
          <p className="text-xs text-subtle">
            <PeriodText period={entry} />
          </p>
          <div>
            <h3 className="font-medium text-ink">
              {entry.title} · {entry.organisation}
            </h3>
            <p>{entry.summary}</p>
            {entry.project && <ProjectLink slug={entry.project} />}
          </div>
        </li>
      ))}
    </ol>
  )
}

/** "Project →", to the page of the Project at `slug`; named after it for assistive tech. */
function ProjectLink({ slug }: { slug: string }) {
  const { t } = useLingui()
  const lang = useSiteLanguage()
  const project = useContent().getProject(slug, lang)
  if (!project) return null
  const { title } = project
  return (
    <Link
      to="/$lang/projects/$slug"
      params={{ lang, slug }}
      aria-label={t`Project: ${title}`}
      className="mt-1 inline-block text-xs font-medium text-ink underline-offset-2 hover:underline"
    >
      {t`Project`} <span aria-hidden>→</span>
    </Link>
  )
}
