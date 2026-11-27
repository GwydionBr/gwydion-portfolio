import { Group, Paper, SimpleGrid, Text, Title } from '@mantine/core'
import { useLingui } from '@lingui/react/macro'
import type { Project } from '#/content'
import { ProjectMeta } from './ProjectMeta'
import { ProjectPageLink } from './ProjectPageLink'
import { ProjectSwatch } from './ProjectSwatch'
import { TagList } from './TagList'
import classes from './LinkCard.module.css'

/** How many of its stack a Project card names. */
const CARD_STACK = 4

/**
 * Projects as cards, two columns on wide screens: title, kind and period,
 * summary, the Project's numbers if it has any, and the start of its stack.
 * Each card links to its Project page. The Overview's featured Projects.
 */
export function ProjectCards({ projects }: { projects: readonly Project[] }) {
  return (
    <SimpleGrid
      component="ul"
      cols={{ base: 1, md: 2 }}
      spacing="md"
      role="list"
      m={0}
      p={0}
      style={{ listStyle: 'none' }}
    >
      {projects.map((project) => (
        <li key={project.slug}>
          <ProjectCard project={project} />
        </li>
      ))}
    </SimpleGrid>
  )
}

function ProjectCard({ project }: { project: Project }) {
  const { t } = useLingui()
  return (
    // The title link covers the whole card; the card's lists stay plain content.
    <Paper
      component="article"
      h="100%"
      p="lg"
      display="flex"
      style={{ flexDirection: 'column' }}
      className={classes.card}
    >
      <Group component="p" gap={8} fz="xs" lh={4 / 3} c="var(--subtle)" wrap="nowrap">
        <ProjectSwatch accent={project.accent} />
        <span>
          <ProjectMeta project={project} />
        </span>
      </Group>
      <Title order={3} fz="md" mt={8}>
        <ProjectPageLink slug={project.slug} className={classes.link}>
          {project.title}
        </ProjectPageLink>
      </Title>
      <Text inherit mt={4} lh={1.625}>
        {project.summary}
      </Text>
      {project.stats && (
        <Group
          component="ul"
          aria-label={t`Numbers`}
          role="list"
          m={0}
          mt="md"
          p={0}
          gap="0.5rem 1.5rem"
          style={{ listStyle: 'none' }}
        >
          {project.stats.map((stat) => (
            <Group component="li" key={stat.label} align="baseline" gap={6} wrap="nowrap">
              <Text
                component="span"
                size="lg"
                lh={28 / 18}
                fw={600}
                c="var(--ink)"
                lts="-0.025em"
                style={{ fontVariantNumeric: 'tabular-nums' }}
              >
                {stat.value}
              </Text>
              <Text component="span" size="xs" c="var(--subtle)">
                {stat.label}
              </Text>
            </Group>
          ))}
        </Group>
      )}
      <TagList label={t`Stack`} tags={project.stack.slice(0, CARD_STACK)} mt="auto" pt="md" />
    </Paper>
  )
}
