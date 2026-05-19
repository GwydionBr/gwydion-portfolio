import { createFileRoute } from '@tanstack/react-router'
import { HomePageContent } from '#/features/home/components/HomePageContent'

export const Route = createFileRoute('/')({
  head: () => ({
    meta: [
      { title: "Gwydion — Developer & Builder" },
      {
        name: "description",
        content:
          "Gwydion Braunsdorf — developer and builder working on Self-Engine, a personal productivity system for intentional work.",
      },
      { property: "og:title", content: "Gwydion — Developer & Builder" },
      {
        property: "og:description",
        content:
          "Gwydion Braunsdorf — developer and builder working on Self-Engine, a personal productivity system for intentional work.",
      },
      { property: "og:url", content: "https://gwydion.dev" },
    ],
    links: [{ rel: "canonical", href: "https://gwydion.dev" }],
  }),
  component: HomePage,
})

function HomePage() {
  return <HomePageContent />
}
