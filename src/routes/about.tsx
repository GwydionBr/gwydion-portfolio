import { createFileRoute } from '@tanstack/react-router'
import { AboutPageContent } from '#/features/about/components/AboutPageContent'

export const Route = createFileRoute('/about')({
  head: () => ({
    meta: [
      { title: "About — Gwydion" },
      {
        name: "description",
        content:
          "Learn about Gwydion Braunsdorf, a developer focused on building tools for intentional work and personal productivity.",
      },
      { property: "og:title", content: "About — Gwydion" },
      {
        property: "og:description",
        content:
          "Learn about Gwydion Braunsdorf, a developer focused on building tools for intentional work and personal productivity.",
      },
      { property: "og:url", content: "https://gwydion.dev/about" },
    ],
    links: [{ rel: "canonical", href: "https://gwydion.dev/about" }],
  }),
  component: AboutPage,
})

function AboutPage() {
  return <AboutPageContent />
}
