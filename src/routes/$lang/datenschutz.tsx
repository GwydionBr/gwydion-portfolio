import { createFileRoute } from '@tanstack/react-router'
import { LegalPage } from '#/legal/LegalPage'
import { PRIVACY_PAGE } from '#/legal/pages'

export const Route = createFileRoute('/$lang/datenschutz')({ component: Datenschutz })

function Datenschutz() {
  return <LegalPage page={PRIVACY_PAGE} />
}
