import { createFileRoute, notFound } from '@tanstack/react-router'
import { useLingui } from '@lingui/react/macro'
import { PROJECT_KIND_LABELS } from '#/components/projectKind'
import { ProjectSwatch } from '#/components/ProjectSwatch'
import { NumberTile, NumberTiles, storyComponents } from '#/components/story'
import { TagList } from '#/components/TagList'
import { Tile } from '#/components/Tile'
import { useProject } from '#/content/react'
import { isLanguage } from '#/i18n/language'
import { NotFoundView } from '#/shell/NotFoundView'
import { pageHead } from '#/seo/pageHead'
import { View } from '#/shell/View'

export const Route = createFileRoute('/$lang/projects/$slug')({
  // An unknown slug is not found. The Project itself is read again in the
  // component: its story is a component, which loader data could not carry to the browser.
  beforeLoad: ({ context, params }) => {
    if (!isLanguage(params.lang) || !context.content.getProject(params.slug, params.lang))
      throw notFound()
  },
  head: ({ match, params }) =>
    pageHead(match, ({ language, content }) => {
      const project = content.getProject(params.slug, language)
      return project && { title: project.title, description: project.summary }
    }),
  component: ProjectPage,
})

/** A Project's page: its meta, stack and numbers, then its story in the Site language. */
function ProjectPage() {
  const { t, i18n } = useLingui()
  const project = useProject(Route.useParams().slug)
  if (!project) return <NotFoundView />
  const { story: Story } = project
  return (
    <View
      title={project.title}
      location={[t`Projects`, project.title]}
      back={{ to: '/$lang/projects', label: t`Back to Projects`, text: t`Projects` }}
    >
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_16rem]">
        <article className="max-w-2xl">
          <p className="flex items-center gap-2 text-xs text-subtle">
            <ProjectSwatch accent={project.accent} />
            {i18n._(PROJECT_KIND_LABELS[project.kind])} · {project.years}
          </p>
          <p className="mt-2 text-base leading-relaxed text-ink">{project.summary}</p>
          {project.stats && (
            <div className="mt-6">
              <NumberTiles label={t`Numbers`}>
                {project.stats.map((stat) => (
                  <NumberTile key={stat.label} value={stat.value} label={stat.label} />
                ))}
              </NumberTiles>
            </div>
          )}
          {Story && (
            <div className="mt-8">
              <Story components={storyComponents} />
            </div>
          )}
        </article>
        <Tile title={t`Stack`} className="self-start">
          <TagList label={t`Stack`} tags={project.stack} className="mt-2" />
        </Tile>
      </div>
    </View>
  )
}
