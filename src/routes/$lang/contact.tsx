import { createFileRoute } from '@tanstack/react-router'
import { useLingui } from '@lingui/react/macro'
import { AvailabilityTile } from '#/components/AvailabilityTile'
import { ProfileLinks } from '#/components/ProfileLinks'
import { Tile } from '#/components/Tile'
import { ContactForm } from '#/contact/ContactForm'
import { View } from '#/shell/View'

export const Route = createFileRoute('/$lang/contact')({ component: Contact })

/** Contact: a short message, or email, LinkedIn and GitHub directly; the Availability restated. */
function Contact() {
  const { t } = useLingui()
  return (
    <View title={t`Contact`}>
      <div className="grid gap-4 lg:grid-cols-3">
        <Tile title={t`Write a message`} className="lg:col-span-2 lg:row-span-2">
          <ContactForm />
        </Tile>
        <Tile title={t`Directly`}>
          <ProfileLinks />
        </Tile>
        <AvailabilityTile />
      </div>
    </View>
  )
}
