import { Group, Text } from '@mantine/core'
import { useLingui } from '@lingui/react/macro'
import { ArrowRight } from '@phosphor-icons/react'
import { useProjects } from '#/content/react'
import classes from './LinkCard.module.css'
import { ProjectPageLink } from './ProjectPageLink'
import { ProjectSwatch } from './ProjectSwatch'
import { Tile } from './Tile'

/**
 * The Project after the one at `slug`, in the configured order (after the
 * last, the first again), as a card linking to its page: what to read next.
 * Nothing when there is no other Project.
 */
export function NextProject({ slug, className }: { slug: string; className?: string }) {
  const { t } = useLingui()
  const projects = useProjects()
  const next =
    projects[(projects.findIndex((project) => project.slug === slug) + 1) % projects.length]
  if (!next || next.slug === slug) return null
  return (
    <Tile
      title={t`Next Project`}
      density="snug"
      className={className ? `${classes.card} ${className}` : classes.card}
    >
      <Group mt={8} gap={8} wrap="nowrap" align="center">
        <ProjectSwatch accent={next.accent} />
        <Text component="span" fw={600} c="var(--ink)" style={{ flex: 1 }}>
          <ProjectPageLink slug={next.slug} className={classes.link}>
            {next.title}
          </ProjectPageLink>
        </Text>
        <ArrowRight aria-hidden size={16} color="var(--subtle)" style={{ flexShrink: 0 }} />
      </Group>
      <Text size="xs" mt={4} lh={1.5} c="var(--muted)" lineClamp={2}>
        {next.summary}
      </Text>
    </Tile>
  )
}
