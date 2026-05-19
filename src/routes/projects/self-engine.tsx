import { createFileRoute } from '@tanstack/react-router'
import { SelfEnginePageContent } from '#/features/projects/self-engine/components/SelfEnginePageContent'

export const Route = createFileRoute('/projects/self-engine')({
  head: () => ({
    meta: [
      { title: "Self-Engine — Gwydion" },
      {
        name: "description",
        content:
          "Self-Engine is a personal productivity system for intentional work, built by Gwydion Braunsdorf.",
      },
      { property: "og:title", content: "Self-Engine — Gwydion" },
      {
        property: "og:description",
        content:
          "Self-Engine is a personal productivity system for intentional work, built by Gwydion Braunsdorf.",
      },
      { property: "og:url", content: "https://gwydion.dev/projects/self-engine" },
    ],
    links: [{ rel: "canonical", href: "https://gwydion.dev/projects/self-engine" }],
  }),
  component: SelfEnginePage,
})

function SelfEnginePage() {
  return <SelfEnginePageContent />
}
