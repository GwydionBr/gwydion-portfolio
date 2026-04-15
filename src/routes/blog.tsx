import { createFileRoute } from '@tanstack/react-router'
import { motion } from 'motion/react'
import { PencilSimpleLine, ArrowUpRight } from '@phosphor-icons/react'
import * as m from '../paraglide/messages'

export const Route = createFileRoute('/blog')({ component: BlogPage })

function BlogPage() {
  return (
    <main style={{ position: 'relative', zIndex: 1, paddingTop: 100 }}>
      <div style={{ maxWidth: 1080, margin: '0 auto', padding: '0 28px' }}>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="mono-label">{m.blog_heading()}</span>
          <h1
            className="display"
            style={{
              fontSize: 'clamp(3rem, 7vw, 6rem)',
              lineHeight: 0.96,
              margin: '16px 0 0',
              letterSpacing: '-0.02em',
            }}
          >
            {m.blog_sub()}
          </h1>
        </motion.div>

        <motion.hr
          className="gold-rule"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          style={{ transformOrigin: 'left', margin: '40px 0 60px' }}
        />

        {/* Coming soon state */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="card"
          style={{
            padding: '64px 48px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <div
            aria-hidden
            style={{
              position: 'absolute', top: -80, right: -60,
              width: 280, height: 280, borderRadius: '50%',
              background: 'radial-gradient(circle, var(--accent-green-dim), transparent 65%)',
            }}
          />

          <div
            style={{
              width: 52, height: 52, borderRadius: 14,
              background: 'var(--accent-green-dim)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: 'var(--accent-green)',
              marginBottom: 24,
            }}
          >
            <PencilSimpleLine size={24} weight="light" />
          </div>

          <h2
            className="display"
            style={{ fontSize: 'clamp(1.6rem, 3vw, 2.4rem)', margin: '0 0 16px', lineHeight: 1.2 }}
          >
            {m.blog_card_title()}
          </h2>

          <p style={{ fontSize: '0.975rem', lineHeight: 1.75, color: 'var(--text-secondary)', margin: '0 0 32px', maxWidth: 480 }}>
            {m.blog_card_desc()}
          </p>

          {/* Topics preview */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 36 }}>
            {TOPICS.map((topic) => (
              <span
                key={topic}
                style={{
                  padding: '5px 12px', borderRadius: 20,
                  background: 'var(--bg-surface)',
                  border: '1px solid var(--border-subtle)',
                  fontSize: '0.78rem',
                  color: 'var(--text-muted)',
                  fontFamily: 'var(--font-mono)',
                  letterSpacing: '0.04em',
                }}
              >
                {topic}
              </span>
            ))}
          </div>

          <a
            href="https://github.com/gwydion"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 6,
              fontSize: '0.825rem', color: 'var(--accent-green)',
              textDecoration: 'none',
            }}
          >
            {m.blog_follow()} <ArrowUpRight size={13} />
          </a>
        </motion.div>
      </div>
    </main>
  )
}

const TOPICS = [
  'Building in public',
  'Productivity systems',
  'Open source',
  'Buddhist philosophy',
  'TypeScript',
  'Self-Engine dev log',
  'Mindfulness & tech',
]
