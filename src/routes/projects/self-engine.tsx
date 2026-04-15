import { createFileRoute, Link } from '@tanstack/react-router'
import { motion } from 'motion/react'
import {
  Timer, CurrencyCircleDollar, CalendarDots, Code,
  ArrowLeft, ArrowUpRight, CheckCircle,
} from '@phosphor-icons/react'
import * as m from '../../paraglide/messages'

export const Route = createFileRoute('/projects/self-engine')({ component: SelfEnginePage })

function SelfEnginePage() {
  return (
    <main style={{ position: 'relative', zIndex: 1, paddingTop: 100 }}>
      <div style={{ maxWidth: 1080, margin: '0 auto', padding: '0 28px' }}>

        {/* Back */}
        <motion.div
          initial={{ opacity: 0, x: -12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          style={{ marginBottom: 48 }}
        >
          <Link
            to="/projects"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              fontSize: '0.825rem', color: 'var(--text-muted)',
              textDecoration: 'none', transition: 'color 0.2s',
            }}
          >
            <ArrowLeft size={14} /> {m.self_back()}
          </Link>
        </motion.div>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
            <span className="mono-label">{m.self_project_label()}</span>
            <span style={{ width: 24, height: 1, background: 'var(--border)' }} />
            <div
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 6,
                padding: '3px 10px', borderRadius: 20,
                background: 'var(--accent-gold-dim)',
              }}
            >
              <span style={{ width: 5, height: 5, borderRadius: '50%', background: 'var(--accent-gold)', boxShadow: '0 0 5px var(--accent-gold)' }} />
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.66rem', letterSpacing: '0.1em', color: 'var(--accent-gold)' }}>
                {m.self_active()}
              </span>
            </div>
          </div>

          <h1
            className="display"
            style={{
              fontSize: 'clamp(3rem, 8vw, 7rem)',
              lineHeight: 0.92,
              margin: '0 0 24px',
              letterSpacing: '-0.02em',
            }}
          >
            {m.se_title()}
          </h1>

          <p style={{ maxWidth: 560, fontSize: '1.1rem', lineHeight: 1.7, color: 'var(--text-secondary)', margin: 0 }}>
            {m.self_intro()}
          </p>
        </motion.div>

        <motion.hr
          className="gold-rule"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          style={{ transformOrigin: 'left', margin: '48px 0' }}
        />

        {/* Feature grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          style={{ marginBottom: 72 }}
        >
          <span className="mono-label" style={{ display: 'block', marginBottom: 24 }}>{m.self_features()}</span>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
              gap: 1,
              background: 'var(--border)',
              border: '1px solid var(--border)',
              borderRadius: 16,
              overflow: 'hidden',
            }}
          >
            {FEATURES.map(({ icon, title, desc }, i) => (
              <motion.div
                key={title}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.3 + i * 0.08 }}
                style={{ background: 'var(--bg-elevated)', padding: '32px 28px' }}
              >
                <div
                  style={{
                    color: 'var(--accent-green)',
                    marginBottom: 16,
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: 40, height: 40,
                    borderRadius: 10,
                    background: 'var(--accent-green-dim)',
                  }}
                >
                  {icon}
                </div>
                <h3 style={{ margin: '0 0 8px', fontSize: '0.95rem', fontWeight: 500, color: 'var(--text-primary)' }}>
                  {title}
                </h3>
                <p style={{ margin: 0, fontSize: '0.845rem', lineHeight: 1.65, color: 'var(--text-muted)' }}>
                  {desc}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Roadmap */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          style={{ marginBottom: 72 }}
        >
          <span className="mono-label" style={{ display: 'block', marginBottom: 24 }}>{m.self_roadmap()}</span>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {ROADMAP.map(({ item, done }, i) => (
              <motion.div
                key={item}
                className="card"
                initial={{ opacity: 0, x: -12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.07 }}
                style={{
                  padding: '14px 20px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 14,
                }}
              >
                <CheckCircle
                  size={18}
                  weight={done ? 'fill' : 'light'}
                  style={{ color: done ? 'var(--accent-green)' : 'var(--text-muted)', flexShrink: 0 }}
                />
                <span
                  style={{
                    fontSize: '0.875rem',
                    color: done ? 'var(--text-primary)' : 'var(--text-muted)',
                    textDecoration: done ? 'none' : 'none',
                  }}
                >
                  {item}
                </span>
                {done && (
                  <span
                    style={{
                      marginLeft: 'auto',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.65rem',
                      letterSpacing: '0.08em',
                      color: 'var(--accent-green)',
                      textTransform: 'uppercase',
                    }}
                  >
                    {m.status_done()}
                  </span>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Tech stack */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{ marginBottom: 72 }}
        >
          <span className="mono-label" style={{ display: 'block', marginBottom: 20 }}>{m.self_built_with()}</span>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {TECH.map((t) => (
              <span
                key={t}
                style={{
                  padding: '5px 12px', borderRadius: 6,
                  background: 'var(--bg-surface)',
                  border: '1px solid var(--border-subtle)',
                  fontSize: '0.78rem',
                  color: 'var(--text-muted)',
                  fontFamily: 'var(--font-mono)',
                  letterSpacing: '0.04em',
                }}
              >
                {t}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Open source note */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="card"
          style={{ padding: '32px 36px', marginBottom: 60, position: 'relative', overflow: 'hidden' }}
        >
          <div
            aria-hidden
            style={{
              position: 'absolute', bottom: -60, right: -40,
              width: 200, height: 200, borderRadius: '50%',
              background: 'radial-gradient(circle, var(--accent-gold-dim), transparent 70%)',
            }}
          />
          <span className="mono-label" style={{ display: 'block', marginBottom: 12 }}>{m.self_open_source()}</span>
          <p style={{ fontSize: '0.95rem', lineHeight: 1.7, color: 'var(--text-secondary)', margin: '0 0 20px', maxWidth: 500 }}>
            {m.self_open_source_desc()}
          </p>
          <a
            href="https://github.com/gwydion"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 6,
              fontSize: '0.825rem', color: 'var(--accent-gold)',
              textDecoration: 'none',
            }}
          >
            {m.self_follow()} <ArrowUpRight size={13} />
          </a>
        </motion.div>

      </div>
    </main>
  )
}

const FEATURES = [
  {
    icon: <Timer size={20} weight="light" />,
    title: 'Time tracking',
    desc: 'Record and categorize time spent on any project or task with precision.',
  },
  {
    icon: <CurrencyCircleDollar size={20} weight="light" />,
    title: 'Finance management',
    desc: 'Link hourly rates to tracked time. Understand what your work is worth.',
  },
  {
    icon: <CalendarDots size={20} weight="light" />,
    title: 'Calendar visualization',
    desc: 'See your work, projects, and appointments in a unified calendar view.',
  },
  {
    icon: <Code size={20} weight="light" />,
    title: 'Project management',
    desc: 'Organize tasks and milestones. Keep projects moving without the overhead.',
  },
]

const ROADMAP = [
  { item: 'Time tracking core', done: true },
  { item: 'Project structure & management', done: true },
  { item: 'Finance & hourly rate tracking', done: true },
  { item: 'Calendar view', done: true },
  { item: 'Dashboard & analytics', done: false },
  { item: 'Mobile app', done: false },
  { item: 'Open source release', done: false },
  { item: 'Collaboration features', done: false },
]

const TECH = [
  'TypeScript', 'React', 'TanStack', 'Mantine', 'Bun',
  'SQLite', 'Drizzle ORM', 'Zod',
]
