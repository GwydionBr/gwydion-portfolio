import { createFileRoute } from '@tanstack/react-router'
import { SelfEnginePageContent } from '#/features/projects/self-engine/components/SelfEnginePageContent'

export const Route = createFileRoute('/projects/self-engine')({ component: SelfEnginePage })

function SelfEnginePage() {
  return <SelfEnginePageContent />
}
