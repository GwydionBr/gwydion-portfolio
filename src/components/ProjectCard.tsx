import { Box, Group, Paper, Text, Title } from '@mantine/core'
import { useLingui } from '@lingui/react/macro'
import { ArrowRight } from '@phosphor-icons/react'
import type { Project } from '#/content'
import { useProject } from '#/content/react'
import { useTheme } from '#/theme/react'
import { BrowserFrame, websiteAddress } from './BrowserFrame'
import { KeyPoints } from './KeyPoints'
import linkCard from './LinkCard.module.css'
import { PeriodText } from './PeriodText'
import classes from './ProjectCard.module.css'
import { ProjectKindAndStatus } from './ProjectMeta'
import { ProjectPageLink } from './ProjectPageLink'
import { ProjectSwatch } from './ProjectSwatch'
import { ScreenshotImage } from './story/ScreenshotImage'

/**
 * How wide the cover shows: the card's width less its paddings, about the
 * whole window on phones, at most the Overview's Projects column beside its
 * rail. Never more, so no larger file is fetched than the screen needs.
 */
const COVER_SIZES = '(min-width: 48em) 42.5rem, calc(100vw - 4.25rem)'

/**
 * A Project on the Overview, as a card that is one link to its page (its
 * title's link covers the card, LinkCard.module.css): its cover in a plain
 * browser window, cropped to its top; its title, kind and status; its
 * summary and key points; its period and role. A Project without a cover
 * shows a lower strip in its accent in the window instead, with its name
 * and its stack, so its card keeps the others' shape. `priority` for the
 * card in the first screen, whose cover is then fetched first.
 */
export function ProjectCard({
  project,
  priority = false,
}: {
  project: Project
  priority?: boolean
}) {
  const { t } = useLingui()
  const { theme } = useTheme()
  const cover = useProject(project.slug)?.cover
  return (
    <Paper component="article" p={0} className={`${linkCard.card} ${classes.card}`}>
      <Box p="md" pb={0}>
        <BrowserFrame address={websiteAddress(project)}>
          {cover ? (
            <div className={classes.crop}>
              <ScreenshotImage
                shot={cover}
                theme={theme}
                sizes={COVER_SIZES}
                priority={priority}
                className={classes.image}
              />
            </div>
          ) : (
            <div
              className={classes.noCover}
              style={{ ['--accent' as string]: project.accent }}
              aria-hidden
            >
              <Text fz="lg" fw={600} c="var(--ink)">
                {project.title}
              </Text>
              <Text size="xs" c="var(--muted)" ta="center">
                {project.stack.join(' · ')}
              </Text>
            </div>
          )}
        </BrowserFrame>
      </Box>
      <Box p="lg">
        <Group justify="space-between" align="center" gap="xs" style={{ rowGap: 8 }}>
          <Group gap="sm" wrap="nowrap" miw={0}>
            <ProjectSwatch accent={project.accent} />
            <Title order={3} fz="lg">
              <ProjectPageLink slug={project.slug} className={linkCard.link}>
                {project.title}
              </ProjectPageLink>
            </Title>
          </Group>
          <ProjectKindAndStatus project={project} />
        </Group>
        <Text mt="xs" lh={1.55}>
          {project.summary}
        </Text>
        <KeyPoints points={project.keyPoints} look="quiet" className={classes.points} mt="sm" />
        <Group justify="space-between" align="flex-end" mt="md" gap="xs" wrap="nowrap">
          <Text size="xs" c="var(--subtle)">
            <PeriodText period={project.period} /> · {project.role}
          </Text>
          {/* What the whole card does, said where the eye ends; the title is the link's name. */}
          <Group gap={4} c="var(--subtle)" wrap="nowrap" aria-hidden style={{ flexShrink: 0 }}>
            <Text size="xs" fw={500} c="var(--subtle)">
              {t`Open project`}
            </Text>
            <ArrowRight size={12} />
          </Group>
        </Group>
      </Box>
    </Paper>
  )
}
