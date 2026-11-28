import { Box, Stack } from '@mantine/core'
import { useLingui } from '@lingui/react/macro'
import type { ProjectWithStory } from '#/content'
import { View } from '#/shell/View'
import { NextProject } from './NextProject'
import { ProjectEntry } from './ProjectEntry'
import { ProjectFacts } from './ProjectFacts'
import { RailLayout, WideOnly } from './RailLayout'
import { StoryContents } from './StoryContents'
import { NumberTile, NumberTiles, StoryProject, storyComponents } from './story'

/**
 * A Project in full, as its own view. It opens with the entry (what it is,
 * its key points, its cover), then tells its story with its numbers first,
 * and ends with the next Project. Where there is room, a rail beside the
 * story stays in view: the story's sections and the facts, the next Project
 * under them, level with the story's end (RailLayout). Narrower, the facts
 * come before the story and the next Project after it; the sections are
 * left out.
 */
export function ProjectDetail({ project }: { project: ProjectWithStory }) {
  const { t } = useLingui()
  const { story } = project
  const sections = story?.sections ?? []
  return (
    <View
      title={project.title}
      location={[t`Projects`, project.title]}
      back={{ to: '/$lang/projects', label: t`Back to Projects`, text: t`Projects` }}
    >
      <RailLayout
        top={<ProjectEntry project={project} />}
        lead={
          <Stack gap="md">
            {sections.length > 1 && (
              <WideOnly>
                <StoryContents sections={sections} />
              </WideOnly>
            )}
            <ProjectFacts project={project} />
          </Stack>
        }
        main={
          <Box component="article" fz="sm" lh="1.25rem">
            {project.stats && (
              <NumberTiles label={t`Numbers`}>
                {project.stats.map((stat) => (
                  <NumberTile key={stat.label} value={stat.value} label={stat.label} />
                ))}
              </NumberTiles>
            )}
            {story && (
              <Box mt={project.stats ? 32 : undefined}>
                <StoryProject slug={project.slug}>
                  <story.Content components={storyComponents} />
                </StoryProject>
              </Box>
            )}
          </Box>
        }
        foot={<NextProject slug={project.slug} />}
      />
    </View>
  )
}
