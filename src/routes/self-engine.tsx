import { createFileRoute } from '@tanstack/react-router'
import { SelfEnginePageContent } from '#/features/projects/self-engine/components/SelfEnginePageContent'
import * as m from '#/generated/paraglide/messages'
import { buildRouteHead } from '#/shared/seo/buildRouteHead'

export const Route = createFileRoute('/self-engine')({
  head: () =>
    buildRouteHead({
      path: '/self-engine',
      title: m.meta_self_engine_title(),
      description: m.meta_self_engine_description(),
      image: {
        path: '/og-self-engine.png',
        alt: 'Self-Engine — a personal productivity system for intentional work.',
        width: 1200,
        height: 630,
      },
    }),
  component: SelfEnginePage,
})

function SelfEnginePage() {
  return <SelfEnginePageContent />
}
