import { createFileRoute } from '@tanstack/react-router'
import { HomePageContent } from '#/features/home/components/HomePageContent'
import * as m from '#/generated/paraglide/messages'
import { buildRouteHead } from '#/shared/seo/buildRouteHead'

export const Route = createFileRoute('/')({
  head: () =>
    buildRouteHead({
      path: '/',
      title: m.meta_home_title(),
      description: m.meta_home_description(),
      image: {
        path: '/og-home.png',
        alt: 'Gwydion — full-stack developer building offline-first products end to end.',
        width: 1200,
        height: 630,
      },
    }),
  component: HomePage,
})

function HomePage() {
  return <HomePageContent />
}
