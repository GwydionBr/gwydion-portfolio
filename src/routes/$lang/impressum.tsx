import { createFileRoute } from '@tanstack/react-router'
import { LegalPage } from '#/legal/LegalPage'
import { IMPRESSUM_PAGE } from '#/legal/pages'

export const Route = createFileRoute('/$lang/impressum')({ component: Impressum })

function Impressum() {
  return <LegalPage page={IMPRESSUM_PAGE} />
}
