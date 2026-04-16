import { SimpleGrid } from '@mantine/core'
import * as m from '#/generated/paraglide/messages'
import { PageIntro } from '#/shared/motion'
import { DisplayTitle, Eyebrow, PageContainer, PageMain } from '#/shared/ui/Page'
import { ContactDetails } from './ContactDetails'
import { ContactForm } from './ContactForm'

export function ContactPageContent() {
  return (
    <PageMain>
      <PageContainer>
        <PageIntro
          eyebrow={<Eyebrow mb={16}>{m.contact_heading()}</Eyebrow>}
          title={
            <DisplayTitle>
              {m.contact_heading()}
              <span style={{ color: 'var(--mantine-color-gold-filled)' }}>.</span>
            </DisplayTitle>
          }
        />

        <SimpleGrid cols={{ base: 1, md: 2 }} spacing={80} verticalSpacing={60}>
          <ContactDetails />
          <ContactForm />
        </SimpleGrid>
      </PageContainer>
    </PageMain>
  )
}
