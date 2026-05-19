import { createFileRoute } from '@tanstack/react-router'
import { ProjectsPageContent } from '#/features/projects/components/ProjectsPageContent'

export const Route = createFileRoute('/projects/')({
  head: () => ({
    meta: [
      { title: "Projects — Gwydion" },
      {
        name: "description",
        content:
          "Projects by Gwydion Braunsdorf, including Self-Engine — a personal productivity system for intentional work.",
      },
      { property: "og:title", content: "Projects — Gwydion" },
      {
        property: "og:description",
        content:
          "Projects by Gwydion Braunsdorf, including Self-Engine — a personal productivity system for intentional work.",
      },
      { property: "og:url", content: "https://gwydion.dev/projects" },
    ],
    links: [{ rel: "canonical", href: "https://gwydion.dev/projects" }],
  }),
  component: ProjectsPage,
})

function ProjectsPage() {
  return <ProjectsPageContent />
}
