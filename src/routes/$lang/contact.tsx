import { createFileRoute } from '@tanstack/react-router'
import { Box, Grid, Stack } from '@mantine/core'
import { msg } from '@lingui/core/macro'
import { useLingui } from '@lingui/react/macro'
import { AvailabilityTile } from '#/components/AvailabilityTile'
import { ProfileLinks } from '#/components/ProfileLinks'
import { Tile } from '#/components/Tile'
import { ContactForm } from '#/contact/ContactForm'
import { pageHead } from '#/seo/pageHead'
import { View } from '#/shell/View'
import { SHELL_BREAKPOINT } from '#/shell/breakpoint'

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
      <Grid gap="md">
        <Grid.Col span={{ base: 12, md: 8 }}>
          <Tile title={t`Write a message`}>
            <ContactForm />
          </Tile>
        </Grid.Col>
        <Grid.Col span={{ base: 12, md: 4 }}>
          <Stack gap="md">
            <Tile title={t`Directly`}>
              <ProfileLinks />
            </Tile>
            {/* Phones only: from the shell breakpoint up the sidebar shows the Availability. */}
            <Box hiddenFrom={SHELL_BREAKPOINT}>
              <AvailabilityTile />
            </Box>
          </Stack>
        </Grid.Col>
      </Grid>
    </View>
  )
}
