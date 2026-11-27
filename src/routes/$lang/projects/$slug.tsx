import { createFileRoute, notFound } from '@tanstack/react-router'
import { Box, Group, Text } from '@mantine/core'
import { useLingui } from '@lingui/react/macro'
import { ProjectFacts } from '#/components/ProjectFacts'
import { ProjectMeta } from '#/components/ProjectMeta'
import { ProjectSwatch } from '#/components/ProjectSwatch'
import { NumberTile, NumberTiles, StoryProject, storyComponents } from '#/components/story'
import { useProject } from '#/content/react'
import { NotFoundView } from '#/shell/NotFoundView'
import { pageHead } from '#/seo/pageHead'
import { View } from '#/shell/View'
import classes from './Projects.module.css'

export const Route = createFileRoute('/$lang/projects/$slug')({
  // An unknown slug is not found. The Project itself is read again in the
  // component: its story is a component, which loader data could not carry to the browser.
  beforeLoad: ({ context, params }) => {
    if (!context.content.getProject(params.slug, params.lang)) throw notFound()
  },
  head: ({ match, params }) =>
    pageHead(match, ({ language, content }) => {
      const project = content.getProject(params.slug, language)
      return project && { title: project.title, description: project.summary }
    }),
  component: ProjectPage,
})

/**
 * A Project's page: its meta and summary, its facts, its numbers, then its
 * story in the Site language. On wide screens the facts are a sticky rail beside
 * the story; below it they follow the summary.
 */
function ProjectPage() {
  const { t } = useLingui()
  const project = useProject(Route.useParams().slug)
  if (!project) return <NotFoundView />
  const { story: Story } = project
  return (
    <View
      title={project.title}
      location={[t`Projects`, project.title]}
      back={{ to: '/$lang/projects', label: t`Back to Projects`, text: t`Projects` }}
    >
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
    </View>
  )
}
