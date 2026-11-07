import type { ReactNode } from 'react'
import { useLingui } from '@lingui/react/macro'
import type { Project } from '#/content'
import { BUTTON_STYLES } from './buttonStyles'
import { PeriodText } from './PeriodText'
import { ProjectKindText } from './ProjectMeta'
import { TagList } from './TagList'
import { Tile } from './Tile'

/**
 * A Project's facts at a glance, for a Recruiter who reads no further: a
 * link to the running product, then kind, period, role, status and whether
 * the source code is public, then the stack. The rail beside a Project's
 * story; `className` places it.
 */
export function ProjectFacts({ project, className }: { project: Project; className?: string }) {
  const { t } = useLingui()
  const { live, source } = project.links
  return (
    <Tile title={t`Facts`} className={className}>
      {live && (
        <a href={live} className={`${BUTTON_STYLES.primary} mt-3 w-full`}>
          {t`Visit website`}
          <span aria-hidden>↗</span>
        </a>
      )}
      <dl className="mt-3 divide-y divide-line">
        <Fact term={t`Kind`}>
          <ProjectKindText kind={project.kind} />
        </Fact>
        <Fact term={t`Period`}>
          <PeriodText period={project.period} />
        </Fact>
        <Fact term={t`Role`}>{project.role}</Fact>
        <Fact term={t`Status`}>{project.status}</Fact>
        <Fact term={t`Source code`}>
          {source ? (
            <a href={source} className="font-medium text-ink underline underline-offset-2">
              {t`Public on GitHub`}
              <span aria-hidden> ↗</span>
            </a>
          ) : (
            t`Not public`
          )}
        </Fact>
      </dl>
      <TagList label={t`Stack`} tags={project.stack} className="mt-3" />
    </Tile>
  )
}

/** One term of the facts and its value. */
function Fact({ term, children }: { term: string; children: ReactNode }) {
  return (
    <div className="py-2">
      <dt className="text-xs text-subtle">{term}</dt>
      <dd className="mt-0.5 text-ink">{children}</dd>
    </div>
  )
}
