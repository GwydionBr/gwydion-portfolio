import { createFileRoute } from '@tanstack/react-router'
import { ProjectsPageContent } from '#/features/projects/components/ProjectsPageContent'

export const Route = createFileRoute('/projects/')({ component: ProjectsPage })

function ProjectsPage() {
  return <ProjectsPageContent />
}
