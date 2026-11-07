import { createFileRoute } from '@tanstack/react-router'
import { LegalPage } from '#/legal/LegalPage'
import { IMPRESSUM_PAGE } from '#/legal/pages'
import { pageHead } from '#/seo/pageHead'

export const Route = createFileRoute('/$lang/impressum')({
  head: ({ match }) => pageHead(match, () => IMPRESSUM_PAGE),
  component: Impressum,
})

function Impressum() {
  return <LegalPage page={IMPRESSUM_PAGE} />
}
