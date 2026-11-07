import { createFileRoute } from '@tanstack/react-router'
import { msg } from '@lingui/core/macro'
import { useLingui } from '@lingui/react/macro'
import { AvailabilityTile } from '#/components/AvailabilityTile'
import { ProfileLinks } from '#/components/ProfileLinks'
import { Tile } from '#/components/Tile'
import { ContactForm } from '#/contact/ContactForm'
import { pageHead } from '#/seo/pageHead'
import { View } from '#/shell/View'

export const Route = createFileRoute('/$lang/contact')({
  head: ({ match }) =>
    pageHead(match, () => ({
      title: msg`Contact`,
      description: msg`Write to Gwydion about a full-time role or a freelance project, or reach him by email, LinkedIn or GitHub.`,
    })),
  component: Contact,
})

/** Contact: a short message, or email, LinkedIn and GitHub directly; on phones the Availability restated. */
function Contact() {
  const { t } = useLingui()
  return (
    // No "Get in touch" action: this is where it leads.
    <View title={t`Contact`} action={null}>
      <div className="grid gap-4 lg:grid-cols-3">
        <Tile title={t`Write a message`} className="lg:col-span-2 lg:row-span-2">
          <ContactForm />
        </Tile>
        <Tile title={t`Directly`}>
          <ProfileLinks />
        </Tile>
        {/* Phones only: from md up the sidebar shows the Availability. */}
        <AvailabilityTile className="md:hidden" />
      </div>
    </View>
  )
}
