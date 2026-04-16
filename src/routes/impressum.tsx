import { createFileRoute } from '@tanstack/react-router'
import { Stack, Text, Title } from '@mantine/core'
import { useEffect } from 'react'
import { StaggerGroup, StaggerItem } from '../components/motion'
import { LegalPageShell } from '../components/legal/LegalPageShell'
import { LegalParagraph } from '../components/legal/LegalParagraph'
import { getImpressumBlocks } from '../content/legal/impressum'
import { useLanguage } from '../lib/LanguageContext'
import * as m from '../paraglide/messages'

export const Route = createFileRoute('/impressum')({ component: ImpressumPage })

function ImpressumPage() {
  const { lang } = useLanguage()
  const blocks = getImpressumBlocks(lang)

  useEffect(() => {
    document.title = `${m.legal_imprint_title()} · gwydion.dev`
  }, [lang])

  return (
    <LegalPageShell
      monoLabel={m.nav_imprint()}
      title={
        <>
          {m.legal_imprint_title()}
          <Text component="span" c="gold">.</Text>
        </>
      }
    >
      <StaggerGroup stagger={0.08}>
        <Stack gap={44}>
          {blocks.map((block, blockIndex) => (
            <StaggerItem key={block.title ?? `block-${blockIndex}`} distance={14} duration={0.55}>
              <article>
                {block.title && (
                  <Title
                    order={2}
                    className="display"
                    style={{
                      fontSize: '1.35rem',
                      fontWeight: 400,
                      margin: '0 0 18px',
                      letterSpacing: '-0.01em',
                    }}
                  >
                    {block.title}
                  </Title>
                )}
                {block.paragraphs.map((paragraph, i) => (
                  <LegalParagraph key={i} last={i === block.paragraphs.length - 1}>
                    {paragraph}
                  </LegalParagraph>
                ))}
              </article>
            </StaggerItem>
          ))}
        </Stack>
      </StaggerGroup>
    </LegalPageShell>
  )
}
