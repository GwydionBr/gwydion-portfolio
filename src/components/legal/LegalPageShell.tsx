import type { ReactNode } from 'react'
import { motion } from 'motion/react'
import { AccentRule, DisplayTitle, Eyebrow, PageContainer, PageMain } from '../ui/Page'

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
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <Eyebrow mb={16}>{monoLabel}</Eyebrow>
          <DisplayTitle size="clamp(2.25rem, 5.5vw, 4rem)">
            {title}
          </DisplayTitle>
        </motion.div>

        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
          style={{ transformOrigin: 'left' }}
        >
          <AccentRule my={36} />
        </motion.div>

        {children}
      </PageContainer>
    </PageMain>
  )
}
