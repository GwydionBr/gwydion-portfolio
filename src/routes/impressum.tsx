import { createFileRoute } from '@tanstack/react-router'
import { Stack, Text, Title } from '@mantine/core'
import { LegalPageShell } from '#/features/legal/components/LegalPageShell'
import { LegalParagraph } from '#/features/legal/components/LegalParagraph'
import { getImpressumBlocks } from '#/features/legal/content/impressum'
import * as m from '#/generated/paraglide/messages'
import { getLocale } from '#/generated/paraglide/runtime'
import { StaggerGroup, StaggerItem } from '#/shared/motion'
import { buildRouteHead } from '#/shared/seo/buildRouteHead'

export const Route = createFileRoute('/impressum')({
  head: () => buildRouteHead({ path: '/impressum', title: m.meta_imprint_title(), description: m.meta_imprint_description() }),
  component: ImpressumPage,
})

function ImpressumPage() {
  const blocks = getImpressumBlocks(getLocale())

  return (
    <LegalPageShell
      monoLabel={m.nav_imprint()}
      title={
        <>
          {m.legal_imprint_title()}
          <Text component="span" c="gold">
            .
          </Text>
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
