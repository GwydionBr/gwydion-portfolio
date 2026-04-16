import { createFileRoute } from '@tanstack/react-router'
import { ContactPageContent } from '#/features/contact/components/ContactPageContent'

export const Route = createFileRoute('/contact')({ component: ContactPage })

function ContactPage() {
  return <ContactPageContent />
}
