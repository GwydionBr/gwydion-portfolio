import { Button, Group, Stack, Text } from '@mantine/core'
import { useLingui } from '@lingui/react/macro'
import { ArrowSquareOut, CheckCircle, GithubLogo } from '@phosphor-icons/react'
import { eventAttributes } from '#/analytics/umami'
import type { ProjectWithStory } from '#/content'
import { ProjectCover } from './ProjectCover'
import classes from './ProjectEntry.module.css'
import { ProjectKindBadge } from './ProjectMeta'
import { StatusPill } from './StatusPill'

/**
 * How a Project's page opens, so a visitor sees in seconds what it is: its
 * kind and status, its summary, its key points and where to see it (website,
 * source code); beside them its cover, when it has one. Without a cover the
 * text stands alone, as wide as the story below it.
 */
export function ProjectEntry({ project }: { project: ProjectWithStory }) {
  const { t } = useLingui()
  const { cover } = project
  const { live, source } = project.links
  const data = { projekt: project.slug }
  return (
    <div className={classes.entry} data-with-cover={cover ? true : undefined}>
      <Stack gap="md" className={classes.text}>
        <Group gap="xs">
          <ProjectKindBadge kind={project.kind} />
          <StatusPill live={project.status.live}>{project.status.label}</StatusPill>
        </Group>
        <Text fz={{ base: 18, xs: 20 }} lh={1.5} fw={500} c="var(--ink)" lts="-0.01em" m={0}>
          {project.summary}
        </Text>
        <Stack
          component="ul"
          role="list"
          aria-label={t`Key points`}
          gap={8}
          m={0}
          p={0}
          style={{ listStyle: 'none' }}
        >
          {project.keyPoints.map((point) => (
            <Group component="li" key={point} gap="sm" wrap="nowrap" align="flex-start">
              <CheckCircle
                aria-hidden
                size={18}
                weight="fill"
                color="var(--available)"
                className={classes.check}
              />
              <Text c="var(--ink)">{point}</Text>
            </Group>
          ))}
        </Stack>
        {(live || source) && (
          <Group gap="sm" mt="xs">
            {live && (
              <Button
                component="a"
                href={live}
                rightSection={<ArrowSquareOut aria-hidden size={16} />}
                {...eventAttributes({ name: 'projekt-website-klick', data })}
              >
                {t`Visit website`}
              </Button>
            )}
            {source && (
              <Button
                component="a"
                href={source}
                variant="default"
                leftSection={<GithubLogo aria-hidden size={16} />}
                {...eventAttributes({ name: 'projekt-code-klick', data })}
              >
                {t`View source`}
              </Button>
            )}
          </Group>
        )}
      </Stack>
      {cover && <ProjectCover shot={cover} address={live && new URL(live).host} />}
    </div>
  )
}
