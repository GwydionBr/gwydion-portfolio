import { createFileRoute } from '@tanstack/react-router'
import { Stack, Text, Title } from '@mantine/core'
import { motion } from 'motion/react'
import { useEffect } from 'react'
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
          <Text component="span" c="var(--app-accent-gold)">.</Text>
        </>
      }
    >
      <Stack gap={44}>
        {blocks.map((block, blockIndex) => (
          <motion.article
            key={block.title ?? `block-${blockIndex}`}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.08 * blockIndex, ease: [0.16, 1, 0.3, 1] }}
          >
            {block.title && (
              <Title
                order={2}
                className="display"
                style={{
                  fontSize: '1.35rem',
                  fontWeight: 400,
                  margin: '0 0 18px',
                  letterSpacing: '-0.01em',
                  color: 'var(--app-text-primary)',
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
          </motion.article>
        ))}
      </Stack>
    </LegalPageShell>
  )
}
