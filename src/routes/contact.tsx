import { createFileRoute } from '@tanstack/react-router'
import { ContactPageContent } from '#/features/contact/components/ContactPageContent'
import * as m from '#/generated/paraglide/messages'
import { buildRouteHead } from '#/shared/seo/buildRouteHead'

export const Route = createFileRoute('/contact')({
  head: () => buildRouteHead({ path: '/contact', title: m.meta_contact_title(), description: m.meta_contact_description() }),
  component: ContactPage,
})

function ContactPage() {
  return <ContactPageContent />
}
