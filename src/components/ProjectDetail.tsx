import { Box } from '@mantine/core'
import { useLingui } from '@lingui/react/macro'
import type { ProjectWithStory } from '#/content'
import { View } from '#/shell/View'
import { NextProject } from './NextProject'
import { ProjectEntry } from './ProjectEntry'
import { ProjectFacts } from './ProjectFacts'
import { StoryContents } from './StoryContents'
import { NumberTile, NumberTiles, StoryProject, storyComponents } from './story'
import classes from './ProjectDetail.module.css'

/**
 * A Project in full, as its own view. It opens with the entry (what it is,
 * its key points, its cover), then tells its story with its numbers first,
 * and ends with the next Project. Where there is room, a rail beside the
 * story stays in view: the story's sections and the facts. Narrower, the
 * facts come before the story; the sections are left out.
 *
 * The rail comes before the story in the page, so it reads in the order it
 * shows when narrow; wide, the CSS puts it beside the story.
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
      <div className={classes.detail}>
        <ProjectEntry project={project} />
        <div className={classes.body}>
          {/* The rail's cell ends where the next Project begins, and so does its stay in view. */}
          <div className={classes.railCell}>
            <div className={classes.rail}>
              {sections.length > 1 && (
                <div className={classes.wideOnly}>
                  <StoryContents sections={sections} />
                </div>
              )}
              <ProjectFacts project={project} />
            </div>
          </div>
          <Box component="article" miw={0} fz="sm" lh="1.25rem" className={classes.story}>
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
          <NextProject slug={project.slug} className={classes.next} />
        </div>
      </div>
    </View>
  )
}
