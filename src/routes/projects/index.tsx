import { createFileRoute } from '@tanstack/react-router'
import { ProjectsPageContent } from '#/features/projects/components/ProjectsPageContent'
import * as m from '#/generated/paraglide/messages'
import { buildRouteHead } from '#/shared/seo/buildRouteHead'

export const Route = createFileRoute('/projects/')({
  head: () => buildRouteHead({ path: '/projects', title: m.meta_projects_title(), description: m.meta_projects_description() }),
  component: ProjectsPage,
})

function ProjectsPage() {
  return <ProjectsPageContent />
}
