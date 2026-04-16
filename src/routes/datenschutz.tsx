import { createFileRoute } from '@tanstack/react-router'
import { Stack, Text, Title } from '@mantine/core'
import { useEffect } from 'react'
import { StaggerGroup, StaggerItem } from '../components/motion'
import { LegalPageShell } from '../components/legal/LegalPageShell'
import { LegalParagraph } from '../components/legal/LegalParagraph'
import { PrivacyTableOfContents } from '../components/legal/PrivacyTableOfContents'
import { getPrivacySections } from '../content/legal/privacy'
import { useLanguage } from '../lib/LanguageContext'
import { AppCard } from '../components/ui/Page'
import * as m from '../paraglide/messages'

export const Route = createFileRoute('/datenschutz')({ component: DatenschutzPage })

function DatenschutzPage() {
  const { lang } = useLanguage()
  const sections = getPrivacySections(lang)

  useEffect(() => {
    document.title = `${m.legal_privacy_title()} · gwydion.dev`
  }, [lang])

  return (
    <LegalPageShell
      monoLabel={m.nav_privacy()}
      title={
        <>
          {m.legal_privacy_title()}
          <Text component="span" c="gold">.</Text>
        </>
      }
    >
      <div className="legal-privacy-layout">
        <PrivacyTableOfContents
          heading={m.legal_toc_heading()}
          items={sections.map((s) => ({ id: s.id, title: s.title }))}
        />

        <StaggerGroup stagger={0.05} style={{ minWidth: 0 }}>
          <Stack gap={40} style={{ minWidth: 0 }}>
            {sections.map((section) => (
              <StaggerItem
                key={section.id}
                id={section.id}
                className="legal-anchor-target"
                distance={14}
                duration={0.55}
              >
                <article>
                  <AppCard p="lg">
                    <Title
                      order={2}
                      className="display"
                      style={{
                        fontSize: '1.25rem',
                        fontWeight: 400,
                        margin: '0 0 16px',
                        letterSpacing: '-0.01em',
                      }}
                    >
                      {section.title}
                    </Title>
                    {section.paragraphs.map((paragraph, i) => (
                      <LegalParagraph key={i} last={i === section.paragraphs.length - 1}>
                        {paragraph}
                      </LegalParagraph>
                    ))}
                  </AppCard>
                </article>
              </StaggerItem>
            ))}
          </Stack>
        </StaggerGroup>
      </div>
    </LegalPageShell>
  )
}
