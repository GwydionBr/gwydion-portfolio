import type { ReactNode } from 'react'
import { DisplayTitle, Eyebrow, PageContainer, PageMain } from '../ui/Page'
import { PageIntro } from '../motion'

interface LegalPageShellProps {
  monoLabel: string
  title: ReactNode
  children: ReactNode
}

/** Shared hero + container for legal pages (matches About / Contact rhythm). */
export function LegalPageShell({ monoLabel, title, children }: LegalPageShellProps) {
  return (
    <PageMain>
      <PageContainer pb={80}>
        <PageIntro
          eyebrow={<Eyebrow mb={16}>{monoLabel}</Eyebrow>}
          title={<DisplayTitle size="clamp(2.25rem, 5.5vw, 4rem)">{title}</DisplayTitle>}
          ruleMargin={36}
        />

        {children}
      </PageContainer>
    </PageMain>
  )
}
