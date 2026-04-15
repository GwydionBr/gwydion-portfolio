import { createFileRoute } from '@tanstack/react-router'
import { motion } from 'motion/react'
import { Leaf, Barbell, Code, ArrowUpRight } from '@phosphor-icons/react'
import * as m from '../paraglide/messages'

export const Route = createFileRoute('/about')({ component: AboutPage })

function AboutPage() {
  return (
    <main style={{ position: 'relative', zIndex: 1, paddingTop: 100 }}>
      <div style={{ maxWidth: 1080, margin: '0 auto', padding: '0 28px' }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="mono-label">{m.about_heading()}</span>
          <h1
            className="display"
            style={{
              fontSize: 'clamp(3rem, 7vw, 6rem)',
              lineHeight: 0.96,
              margin: '16px 0 0',
              letterSpacing: '-0.02em',
            }}
          >
            Developer.<br />
            <em style={{ fontStyle: 'italic', color: 'var(--accent-green)' }}>Builder.</em>
            <br />Human.
          </h1>
        </motion.div>

        <motion.hr
          className="gold-rule"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          style={{ transformOrigin: 'left', margin: '40px 0' }}
        />

        {/* Two-column layout */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
            gap: '60px 80px',
            marginBottom: 100,
          }}
        >
          {/* Bio */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <p
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1.35rem',
                lineHeight: 1.6,
                color: 'var(--text-primary)',
                margin: '0 0 28px',
                fontWeight: 400,
              }}
            >
              "{m.about_p1()}"
            </p>
            <p style={{ fontSize: '0.95rem', lineHeight: 1.8, color: 'var(--text-secondary)', margin: '0 0 20px' }}>
              {m.about_p2()}
            </p>
            <p style={{ fontSize: '0.95rem', lineHeight: 1.8, color: 'var(--text-secondary)', margin: 0 }}>
              {m.about_p3()}
            </p>
          </motion.div>

          {/* Focus areas */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="mono-label" style={{ marginBottom: 24, display: 'block' }}>
              Focus areas
            </span>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {FOCUS_AREAS.map(({ icon, title, desc }, i) => (
                <motion.div
                  key={title}
                  className="card"
                  initial={{ opacity: 0, x: 16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 + i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                  style={{
                    padding: '18px 20px',
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: 16,
                  }}
                >
                  <div
                    style={{
                      color: 'var(--accent-green)',
                      marginTop: 2,
                      flexShrink: 0,
                    }}
                  >
                    {icon}
                  </div>
                  <div>
                    <div
                      style={{
                        fontSize: '0.85rem',
                        fontWeight: 500,
                        color: 'var(--text-primary)',
                        marginBottom: 4,
                      }}
                    >
                      {title}
                    </div>
                    <div style={{ fontSize: '0.825rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
                      {desc}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Currently section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          style={{ marginBottom: 100 }}
        >
          <span className="mono-label" style={{ marginBottom: 24, display: 'block' }}>
            Right now
          </span>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: 1,
              background: 'var(--border)',
              borderRadius: 16,
              overflow: 'hidden',
              border: '1px solid var(--border)',
            }}
          >
            {NOW_ITEMS.map(({ label, value }, i) => (
              <motion.div
                key={label}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.07 }}
                style={{
                  background: 'var(--bg-elevated)',
                  padding: '28px 24px',
                }}
              >
                <div className="mono-label" style={{ marginBottom: 10 }}>{label}</div>
                <div style={{ fontSize: '0.9rem', color: 'var(--text-primary)', lineHeight: 1.5 }}>
                  {value}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Links */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 12,
            paddingBottom: 40,
          }}
        >
          {LINKS.map(({ label, href }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 6,
                padding: '10px 18px',
                borderRadius: 8,
                background: 'var(--bg-elevated)',
                border: '1px solid var(--border)',
                fontSize: '0.825rem',
                color: 'var(--text-secondary)',
                textDecoration: 'none',
                transition: 'border-color 0.2s, color 0.2s',
              }}
            >
              {label} <ArrowUpRight size={13} />
            </a>
          ))}
        </motion.div>
      </div>
    </main>
  )
}

const FOCUS_AREAS = [
  {
    icon: <Code size={18} weight="light" />,
    title: 'Software development',
    desc: 'TypeScript, React, full-stack. Preference for simple, durable systems.',
  },
  {
    icon: <Leaf size={18} weight="light" />,
    title: 'Buddhist practice',
    desc: 'Theravāda tradition. Meditation, mindfulness, ethical living.',
  },
  {
    icon: <Barbell size={18} weight="light" />,
    title: 'Physical training',
    desc: 'Strength and endurance. Consistency over intensity.',
  },
]

const NOW_ITEMS = [
  { label: 'Main project', value: 'Self-Engine' },
  { label: 'Learning', value: 'Systems design & Buddhist philosophy' },
  { label: 'Reading', value: 'Dhammapada' },
  { label: 'Location', value: 'Germany' },
]

const LINKS = [
  { label: 'GitHub', href: 'https://github.com/gwydion' },
  { label: 'Self-Engine', href: 'https://self-engine.app' },
]
