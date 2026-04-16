import { createFileRoute } from '@tanstack/react-router'
import { HomePageContent } from '#/features/home/components/HomePageContent'

export const Route = createFileRoute('/')({ component: HomePage })

function HomePage() {
  return <HomePageContent />
}
