import type { ReactNode } from 'react'
import { motion } from 'motion/react'

interface LegalPageShellProps {
  monoLabel: string
  title: ReactNode
  children: ReactNode
}

/** Shared hero + container for legal pages (matches About / Contact rhythm). */
export function LegalPageShell({ monoLabel, title, children }: LegalPageShellProps) {
  return (
    <main style={{ position: 'relative', zIndex: 1, paddingTop: 100 }}>
      <div style={{ maxWidth: 1080, margin: '0 auto', padding: '0 28px 80px' }}>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="mono-label">{monoLabel}</span>
          <h1
            className="display"
            style={{
              fontSize: 'clamp(2.25rem, 5.5vw, 4rem)',
              lineHeight: 1.02,
              margin: '16px 0 0',
              letterSpacing: '-0.02em',
            }}
          >
            {title}
          </h1>
        </motion.div>

        <motion.hr
          className="gold-rule"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
          style={{ transformOrigin: 'left', margin: '36px 0 48px' }}
        />

        {children}
      </div>
    </main>
  )
}
