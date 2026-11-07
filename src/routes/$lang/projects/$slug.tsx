import { createFileRoute, notFound } from '@tanstack/react-router'
import { useLingui } from '@lingui/react/macro'
import { ProjectFacts } from '#/components/ProjectFacts'
import { ProjectMeta } from '#/components/ProjectMeta'
import { ProjectSwatch } from '#/components/ProjectSwatch'
import { NumberTile, NumberTiles, StoryProject, storyComponents } from '#/components/story'
import { useProject } from '#/content/react'
import { NotFoundView } from '#/shell/NotFoundView'
import { pageHead } from '#/seo/pageHead'
import { View } from '#/shell/View'

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
 * story in the Site language. From `lg` up the facts are a sticky rail beside
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
      {/* One column below lg in source order; from lg the facts span both rows of the right column. */}
      <article className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_17rem] lg:gap-x-10">
        <div className="max-w-2xl">
          <p className="flex items-center gap-2 text-xs text-subtle">
            <ProjectSwatch accent={project.accent} />
            <span>
              <ProjectMeta project={project} />
            </span>
          </p>
          <p className="mt-2 text-base leading-relaxed text-ink">{project.summary}</p>
        </div>
        <ProjectFacts
          project={project}
          className="self-start lg:sticky lg:top-10 lg:col-start-2 lg:row-span-2 lg:row-start-1"
        />
        <div className="min-w-0 max-w-2xl">
          {project.stats && (
            <NumberTiles label={t`Numbers`}>
              {project.stats.map((stat) => (
                <NumberTile key={stat.label} value={stat.value} label={stat.label} />
              ))}
            </NumberTiles>
          )}
          {Story && (
            <div className={project.stats ? 'mt-8' : ''}>
              <StoryProject slug={project.slug}>
                <Story components={storyComponents} />
              </StoryProject>
            </div>
          )}
        </div>
      </article>
    </View>
  )
}
