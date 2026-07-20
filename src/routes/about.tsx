import { createFileRoute } from '@tanstack/react-router'
import { AboutPageContent } from '#/features/about/components/AboutPageContent'
import * as m from '#/generated/paraglide/messages'
import { buildRouteHead } from '#/shared/seo/buildRouteHead'

export const Route = createFileRoute('/about')({
  head: () => buildRouteHead({ path: '/about', title: m.meta_about_title(), description: m.meta_about_description() }),
  component: AboutPage,
})

function AboutPage() {
  return <AboutPageContent />
}
