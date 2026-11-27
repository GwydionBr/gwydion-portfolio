import { Box, Text } from '@mantine/core'
import type { CareerEntry } from '#/content'
import { useContent } from '#/content/react'
import { useSiteLanguage } from '#/i18n/react'
import { PeriodText } from './PeriodText'
import { ProjectPageLink } from './ProjectPageLink'
import lists from './lists.module.css'
import classes from './CareerList.module.css'

/**
 * Career entries in the order given, each with period, title, organisation
 * and summary, and a link to the Project it was about.
 */
export function CareerList({ entries }: { entries: readonly CareerEntry[] }) {
  return (
    <Box component="ol" mt={8} className={`${lists.reset} ${lists.divided}`}>
      {entries.map((entry) => (
        <li
          key={`${entry.start}-${entry.organisation}`}
          className={`${classes.entry} ${entry.placeholder ? 'stand-in' : ''}`}
        >
          <Text size="xs" c="var(--subtle)">
            <PeriodText period={entry} />
          </Text>
          <div>
            <Text component="h3" inherit fw={500} c="var(--ink)">
              {entry.title} · {entry.organisation}
            </Text>
            <Text inherit>{entry.summary}</Text>
            {entry.project && <ProjectLink slug={entry.project} />}
          </div>
        </li>
      ))}
    </Box>
  )
}

/** "<Project title> →", to the page of the Project at `slug`. */
function ProjectLink({ slug }: { slug: string }) {
  const lang = useSiteLanguage()
  const project = useContent().getProject(slug, lang)
  if (!project) return null
  const { title } = project
  return (
    <ProjectPageLink slug={slug} className={classes.link}>
      {title} <span aria-hidden>→</span>
    </ProjectPageLink>
  )
}
