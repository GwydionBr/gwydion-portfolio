import { createFileRoute } from '@tanstack/react-router'
import { AboutPageContent } from '#/features/about/components/AboutPageContent'

export const Route = createFileRoute('/about')({ component: AboutPage })

function AboutPage() {
  return <AboutPageContent />
}
