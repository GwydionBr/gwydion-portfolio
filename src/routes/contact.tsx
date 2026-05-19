import { createFileRoute } from '@tanstack/react-router'
import { ContactPageContent } from '#/features/contact/components/ContactPageContent'

export const Route = createFileRoute('/contact')({
  head: () => ({
    meta: [
      { title: "Contact — Gwydion" },
      {
        name: "description",
        content:
          "Get in touch with Gwydion Braunsdorf for collaborations, questions, or project inquiries.",
      },
      { property: "og:title", content: "Contact — Gwydion" },
      {
        property: "og:description",
        content:
          "Get in touch with Gwydion Braunsdorf for collaborations, questions, or project inquiries.",
      },
      { property: "og:url", content: "https://gwydion.dev/contact" },
    ],
    links: [{ rel: "canonical", href: "https://gwydion.dev/contact" }],
  }),
  component: ContactPage,
})

function ContactPage() {
  return <ContactPageContent />
}
