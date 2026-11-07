import { createFileRoute } from '@tanstack/react-router'
import { LegalPage } from '#/legal/LegalPage'
import { PRIVACY_PAGE } from '#/legal/pages'
import { pageHead } from '#/seo/pageHead'

export const Route = createFileRoute('/$lang/datenschutz')({
  head: ({ match }) => pageHead(match, () => PRIVACY_PAGE),
  component: Datenschutz,
})

function Datenschutz() {
  return <LegalPage page={PRIVACY_PAGE} />
}
