import { Box, Group, Text } from '@mantine/core'
import type { Project } from '#/content'
import { ProjectMeta } from './ProjectMeta'
import { ProjectPageLink } from './ProjectPageLink'
import { ProjectSwatch } from './ProjectSwatch'
import lists from './lists.module.css'
import classes from './ProjectList.module.css'

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
  return (
    <Box component="ol" aria-label={label} className={`${lists.reset} ${lists.divided}`}>
      {projects.map((project) => (
        <li key={project.slug}>
          <ProjectPageLink slug={project.slug} className={classes.row}>
            <ProjectSwatch accent={project.accent} className={classes.swatch} />
            <Box miw={0} style={{ flex: 1 }}>
              <Group align="baseline" justify="space-between" className={classes.meta}>
                <Text component="h2" inherit fw={500} c="var(--ink)">
                  {project.title}
                </Text>
                <Text component="span" size="xs" c="var(--subtle)">
                  <ProjectMeta project={project} />
                </Text>
              </Group>
              <Text component="span" inherit display="block" mt={2}>
                {project.summary}
              </Text>
            </Box>
          </ProjectPageLink>
        </li>
      ))}
    </Box>
  )
}
