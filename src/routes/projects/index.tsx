import { createFileRoute, Link } from '@tanstack/react-router'
import { motion } from 'motion/react'
import { ArrowRight, Timer, CurrencyCircleDollar, CalendarDots, Code } from '@phosphor-icons/react'
import * as m from '../../paraglide/messages'

export const Route = createFileRoute('/projects/')({ component: ProjectsPage })

function ProjectsPage() {
  return (
    <main style={{ position: 'relative', zIndex: 1, paddingTop: 100 }}>
      <div style={{ maxWidth: 1080, margin: '0 auto', padding: '0 28px' }}>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="mono-label">{m.projects_heading()}</span>
          <h1
            className="display"
            style={{
              fontSize: 'clamp(3rem, 7vw, 6rem)',
              lineHeight: 0.96,
              margin: '16px 0 0',
              letterSpacing: '-0.02em',
            }}
          >
            {m.projects_title_a()}<br />
            <em style={{ fontStyle: 'italic', color: 'var(--accent-green)' }}>{m.projects_title_b()}</em>
          </h1>
        </motion.div>

        <motion.hr
          className="gold-rule"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          style={{ transformOrigin: 'left', margin: '40px 0 60px' }}
        />

        {/* Self-Engine card */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <Link to="/projects/self-engine" style={{ textDecoration: 'none' }}>
            <div
              className="card"
              style={{
                padding: '48px',
                position: 'relative',
                overflow: 'hidden',
                cursor: 'pointer',
                transition: 'transform 0.25s ease, border-color 0.25s ease',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.borderColor = 'var(--accent-green)' }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.borderColor = 'var(--border)' }}
            >
              {/* Glow */}
              <div
                aria-hidden
                style={{
                  position: 'absolute', top: -100, right: -60,
                  width: 380, height: 380, borderRadius: '50%',
                  background: 'radial-gradient(circle, var(--accent-green-dim), transparent 65%)',
                  pointerEvents: 'none',
                }}
              />

              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 20, flexWrap: 'wrap' }}>
                <div style={{ flex: 1, minWidth: 280 }}>
                  {/* Badge */}
                  <div
                    style={{
                      display: 'inline-flex', alignItems: 'center', gap: 6,
                      padding: '4px 12px', borderRadius: 20,
                      background: 'var(--accent-gold-dim)',
                      marginBottom: 24,
                    }}
                  >
                    <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--accent-gold)', boxShadow: '0 0 6px var(--accent-gold)' }} />
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', letterSpacing: '0.1em', color: 'var(--accent-gold)' }}>
                      {m.se_status()}
                    </span>
                  </div>

                  <h2
                    className="display"
                    style={{ fontSize: 'clamp(2.2rem, 4vw, 3.2rem)', margin: '0 0 16px', lineHeight: 1.05 }}
                  >
                    {m.se_title()}
                  </h2>

                  <p style={{ fontSize: '1rem', lineHeight: 1.7, color: 'var(--text-secondary)', margin: '0 0 28px', maxWidth: 520 }}>
                    {m.se_desc()}
                  </p>

                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 32 }}>
                    {[
                      { icon: <Timer size={13} />, label: m.project_tag_time() },
                      { icon: <CurrencyCircleDollar size={13} />, label: m.project_tag_finance() },
                      { icon: <CalendarDots size={13} />, label: m.project_tag_calendar() },
                      { icon: <Code size={13} />, label: m.project_tag_management() },
                    ].map(({ icon, label }) => (
                      <span
                        key={label}
                        style={{
                          display: 'inline-flex', alignItems: 'center', gap: 5,
                          padding: '4px 10px', borderRadius: 5,
                          background: 'var(--bg-surface)',
                          border: '1px solid var(--border-subtle)',
                          fontSize: '0.75rem',
                          color: 'var(--text-muted)',
                          fontFamily: 'var(--font-mono)',
                          letterSpacing: '0.04em',
                        }}
                      >
                        {icon} {label}
                      </span>
                    ))}
                  </div>

                  <span
                    style={{
                      display: 'inline-flex', alignItems: 'center', gap: 8,
                      fontSize: '0.875rem', fontWeight: 500,
                      color: 'var(--accent-green)',
                    }}
                  >
                    {m.projects_view()} <ArrowRight size={15} weight="bold" />
                  </span>
                </div>
              </div>
            </div>
          </Link>
        </motion.div>

        {/* Placeholder for future projects */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          style={{ marginTop: 16 }}
        >
          <div
            style={{
              padding: '32px 40px',
              borderRadius: 16,
              border: '1px dashed var(--border)',
              display: 'flex',
              alignItems: 'center',
              gap: 16,
            }}
          >
            <span className="mono-label">{m.projects_more_heading()}</span>
            <span style={{ width: 40, height: 1, background: 'var(--border)' }} />
            <span style={{ fontSize: '0.825rem', color: 'var(--text-muted)' }}>
              {m.projects_more_desc()}
            </span>
          </div>
        </motion.div>
      </div>
    </main>
  )
}
