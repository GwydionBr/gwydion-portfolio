import { createFileRoute, notFound } from '@tanstack/react-router'
import { ProjectDetail } from '#/components/ProjectDetail'
import { useProject } from '#/content/react'
import { NotFoundView } from '#/shell/NotFoundView'
import { pageHead } from '#/seo/pageHead'

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
  staticData: { secondaryNavigation: 'projects' },
  component: ProjectPage,
})

/** A Project's page; on wide screens every Project is listed beside it, in the shell's second sidebar. */
function ProjectPage() {
  const project = useProject(Route.useParams().slug)
  if (!project) return <NotFoundView />
  return <ProjectDetail project={project} />
}
