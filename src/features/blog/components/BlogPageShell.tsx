import type { ReactNode } from 'react'
import { PageIntro } from '#/shared/motion'
import { DisplayTitle, Eyebrow, PageContainer, PageMain } from '#/shared/ui/Page'

interface BlogPageShellProps {
  eyebrow: string
  title: ReactNode
  children: ReactNode
}

export function BlogPageShell({ eyebrow, title, children }: BlogPageShellProps) {
  return (
    <PageMain>
      <PageContainer>
        <PageIntro
          eyebrow={<Eyebrow mb={16}>{eyebrow}</Eyebrow>}
          title={<DisplayTitle>{title}</DisplayTitle>}
        />
        {children}
      </PageContainer>
    </PageMain>
  )
}
