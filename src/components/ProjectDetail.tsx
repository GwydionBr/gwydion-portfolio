import { Box, Group, Text } from '@mantine/core'
import { useLingui } from '@lingui/react/macro'
import type { ProjectWithStory } from '#/content'
import { View } from '#/shell/View'
import { ProjectFacts } from './ProjectFacts'
import { ProjectMeta } from './ProjectMeta'
import { ProjectSwatch } from './ProjectSwatch'
import { NumberTile, NumberTiles, StoryProject, storyComponents } from './story'
import classes from './ProjectDetail.module.css'

/**
 * A Project in full, as its own view: its meta and summary, its facts, its
 * numbers, then its story in the Site language. Where there is room the
 * facts are a sticky rail beside the story; otherwise they follow the summary.
 */
export function ProjectDetail({ project }: { project: ProjectWithStory }) {
  const { t } = useLingui()
  const { story: Story } = project
  return (
    <View
      title={project.title}
      location={[t`Projects`, project.title]}
      back={{ to: '/$lang/projects', label: t`Back to Projects`, text: t`Projects` }}
    >
      <div className={classes.detail}>
        {/* The facts span both rows of the right column when there is room. */}
        <Box component="article" fz="sm" lh="1.25rem" className={classes.article}>
          <Box maw={672}>
            <Group component="p" wrap="nowrap" gap={8} fz="xs" lh="1rem" c="var(--subtle)" m={0}>
              <ProjectSwatch accent={project.accent} />
              <span>
                <ProjectMeta project={project} />
              </span>
            </Group>
            <Text mt={8} size="md" lh={1.625} c="var(--ink)">
              {project.summary}
            </Text>
          </Box>
          <ProjectFacts project={project} className={classes.facts} />
          <Box miw={0} maw={672}>
            {project.stats && (
              <NumberTiles label={t`Numbers`}>
                {project.stats.map((stat) => (
                  <NumberTile key={stat.label} value={stat.value} label={stat.label} />
                ))}
              </NumberTiles>
            )}
            {Story && (
              <Box mt={project.stats ? 32 : undefined}>
                <StoryProject slug={project.slug}>
                  <Story components={storyComponents} />
                </StoryProject>
              </Box>
            )}
          </Box>
        </Box>
      </div>
    </View>
  )
}
