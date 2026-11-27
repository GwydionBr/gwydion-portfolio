import { Box, Divider, List, Text, Title } from '@mantine/core'
import type { CareerEntry } from '#/content'
import { useContent } from '#/content/react'
import { useSiteLanguage } from '#/i18n/react'
import { PeriodText } from './PeriodText'
import { ProjectPageLink } from './ProjectPageLink'
import classes from './CareerList.module.css'

/**
 * Career entries in the order given, each with period, title, organisation
 * and summary, and a link to the Project it was about.
 */
export function CareerList({ entries }: { entries: readonly CareerEntry[] }) {
  return (
    <List type="ordered" role="list" listStyleType="none" m={0} mt={8} p={0}>
      {entries.map((entry, index) => (
        <li
          key={`${entry.start}-${entry.organisation}`}
          className={entry.placeholder ? 'stand-in' : undefined}
        >
          {index > 0 && <Divider color="var(--line)" aria-hidden />}
          <Box py="sm" className={classes.entry}>
            <Text size="xs" c="var(--subtle)">
              <PeriodText period={entry} />
            </Text>
            <div>
              <Title order={3} fz="inherit" lh="inherit" fw={500}>
                {entry.title} · {entry.organisation}
              </Title>
              <Text inherit>{entry.summary}</Text>
              {entry.project && <ProjectLink slug={entry.project} />}
            </div>
          </Box>
        </li>
      ))}
    </List>
  )
}

/** "<Project title> →", to the page of the Project at `slug`. */
function ProjectLink({ slug }: { slug: string }) {
  const lang = useSiteLanguage()
  const project = useContent().getProject(slug, lang)
  if (!project) return null
  const { title } = project
  return (
    <Text component="span" display="block" mt={4} size="xs" fw={500}>
      <ProjectPageLink slug={slug} underline="hover">
        {title} <span aria-hidden>→</span>
      </ProjectPageLink>
    </Text>
  )
}
