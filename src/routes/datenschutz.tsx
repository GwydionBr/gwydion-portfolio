import { createFileRoute } from '@tanstack/react-router'
import { motion } from 'motion/react'
import { useEffect } from 'react'
import { LegalPageShell } from '../components/legal/LegalPageShell'
import { LegalParagraph } from '../components/legal/LegalParagraph'
import { PrivacyTableOfContents } from '../components/legal/PrivacyTableOfContents'
import { getPrivacySections } from '../content/legal/privacy'
import { useLanguage } from '../lib/LanguageContext'
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
          <span style={{ color: 'var(--accent-gold)' }}>.</span>
        </>
      }
    >
      <div className="legal-privacy-layout">
        <PrivacyTableOfContents
          heading={m.legal_toc_heading()}
          items={sections.map((s) => ({ id: s.id, title: s.title }))}
        />

        <div style={{ display: 'flex', flexDirection: 'column', gap: 40, minWidth: 0 }}>
          {sections.map((section, sectionIndex) => (
            <motion.article
              key={section.id}
              id={section.id}
              className="legal-anchor-target"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.05 * sectionIndex, ease: [0.16, 1, 0.3, 1] }}
              style={{
                padding: '28px 24px',
                borderRadius: 16,
                border: '1px solid var(--border)',
                background: 'var(--bg-elevated)',
              }}
            >
              <h2
                className="display"
                style={{
                  fontSize: '1.25rem',
                  fontWeight: 400,
                  margin: '0 0 16px',
                  letterSpacing: '-0.01em',
                  color: 'var(--text-primary)',
                }}
              >
                {section.title}
              </h2>
              {section.paragraphs.map((paragraph, i) => (
                <LegalParagraph key={i} last={i === section.paragraphs.length - 1}>
                  {paragraph}
                </LegalParagraph>
              ))}
            </motion.article>
          ))}
        </div>
      </div>
    </LegalPageShell>
  )
}
