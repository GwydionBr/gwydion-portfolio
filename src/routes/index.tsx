import { createFileRoute, Link } from '@tanstack/react-router'
import { ArrowRight, Timer, CurrencyCircleDollar, CalendarDots, Barbell, Leaf, Code } from '@phosphor-icons/react'
import { motion } from 'motion/react'

export const Route = createFileRoute('/')({ component: HomePage })

function HomePage() {
  return (
    <main style={{ position: 'relative', zIndex: 1 }}>
      <HeroSection />
      <CurrentlySection />
      <FeaturedProjectSection />
      <AboutTeaser />
    </main>
  )
}

/* ── Hero ─────────────────────────────────────────────────────────────── */
function HeroSection() {
  return (
    <section
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '0 28px',
        paddingTop: 80,
      }}
    >
      <div style={{ maxWidth: 1080, margin: '0 auto', width: '100%' }}>
        {/* Mono label */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="mono-label">gwydion.dev</span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          className="display"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          style={{
            fontSize: 'clamp(3.5rem, 10vw, 9rem)',
            lineHeight: 0.95,
            margin: '20px 0 0',
            letterSpacing: '-0.02em',
          }}
        >
          Building
          <br />
          <em style={{ fontStyle: 'italic', color: 'var(--accent-green)' }}>
            intentional
          </em>
          <br />
          systems.
        </motion.h1>

        {/* Gold rule */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          style={{ transformOrigin: 'left' }}
        >
          <hr className="gold-rule" style={{ margin: '32px 0' }} />
        </motion.div>

        {/* Sub */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          style={{
            maxWidth: 480,
            fontSize: '1.05rem',
            lineHeight: 1.7,
            color: 'var(--text-secondary)',
            margin: 0,
          }}
        >
          Developer & creator working on{' '}
          <strong style={{ color: 'var(--text-primary)', fontWeight: 500 }}>Self-Engine</strong>
          {' '}— a system for managing time, projects, and finances with clarity.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.65, ease: [0.16, 1, 0.3, 1] }}
          style={{ display: 'flex', gap: 14, flexWrap: 'wrap', marginTop: 40 }}
        >
          <Link
            to="/projects"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              padding: '12px 24px',
              background: 'var(--accent-green)',
              color: '#fff',
              borderRadius: 10,
              fontSize: '0.875rem',
              fontWeight: 500,
              letterSpacing: '0.02em',
              textDecoration: 'none',
              transition: 'opacity 0.2s, transform 0.2s',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.opacity = '0.88'; e.currentTarget.style.transform = 'translateY(-1px)' }}
            onMouseLeave={(e) => { e.currentTarget.style.opacity = '1'; e.currentTarget.style.transform = 'translateY(0)' }}
          >
            See my work <ArrowRight size={15} weight="bold" />
          </Link>
          <Link
            to="/contact"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              padding: '12px 24px',
              background: 'transparent',
              color: 'var(--text-primary)',
              border: '1px solid var(--border)',
              borderRadius: 10,
              fontSize: '0.875rem',
              fontWeight: 500,
              letterSpacing: '0.02em',
              textDecoration: 'none',
              transition: 'border-color 0.2s, transform 0.2s',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--accent-green)'; e.currentTarget.style.transform = 'translateY(-1px)' }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.transform = 'translateY(0)' }}
          >
            Get in touch
          </Link>
        </motion.div>
      </div>

      {/* Scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 1 }}
        style={{
          position: 'absolute',
          bottom: 40,
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 8,
        }}
      >
        <span className="mono-label" style={{ fontSize: '0.6rem' }}>scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
          style={{
            width: 1,
            height: 32,
            background: 'linear-gradient(to bottom, var(--text-muted), transparent)',
          }}
        />
      </motion.div>
    </section>
  )
}

/* ── Currently ────────────────────────────────────────────────────────── */
const CURRENTLY = [
  {
    icon: <Code size={20} weight="light" />,
    label: 'Building',
    text: 'Self-Engine — a personal productivity app for time tracking, project management and financial clarity.',
  },
  {
    icon: <Leaf size={20} weight="light" />,
    label: 'Practicing',
    text: 'Buddhism, meditation, and the art of doing less, better.',
  },
  {
    icon: <Barbell size={20} weight="light" />,
    label: 'Training',
    text: 'Consistently. The body is part of the system.',
  },
] as const

function CurrentlySection() {
  return (
    <section style={{ padding: '120px 28px 0' }}>
      <div style={{ maxWidth: 1080, margin: '0 auto' }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="mono-label">Currently</span>
          <h2
            className="display"
            style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', margin: '12px 0 48px', lineHeight: 1.1 }}
          >
            Where my focus is.
          </h2>
        </motion.div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: 16,
          }}
        >
          {CURRENTLY.map(({ icon, label, text }, i) => (
            <motion.div
              key={label}
              className="card"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              style={{ padding: '28px 28px 32px' }}
            >
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: 40,
                  height: 40,
                  borderRadius: 10,
                  background: 'var(--accent-green-dim)',
                  color: 'var(--accent-green)',
                  marginBottom: 20,
                }}
              >
                {icon}
              </div>
              <div className="mono-label" style={{ marginBottom: 8 }}>{label}</div>
              <p style={{ margin: 0, fontSize: '0.925rem', lineHeight: 1.65, color: 'var(--text-secondary)' }}>
                {text}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ── Featured project ─────────────────────────────────────────────────── */
function FeaturedProjectSection() {
  return (
    <section style={{ padding: '120px 28px 0' }}>
      <div style={{ maxWidth: 1080, margin: '0 auto' }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="mono-label">Featured project</span>
        </motion.div>

        <motion.div
          className="card"
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          style={{
            marginTop: 20,
            padding: '48px 48px 40px',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* Background glow */}
          <div
            aria-hidden
            style={{
              position: 'absolute',
              top: -80,
              right: -80,
              width: 320,
              height: 320,
              borderRadius: '50%',
              background: 'radial-gradient(circle, var(--accent-green-dim), transparent 70%)',
              pointerEvents: 'none',
            }}
          />

          {/* Status badge */}
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 6,
              padding: '4px 12px',
              borderRadius: 20,
              background: 'var(--accent-gold-dim)',
              border: '1px solid var(--accent-gold-dim)',
              marginBottom: 24,
            }}
          >
            <span
              style={{
                width: 6, height: 6, borderRadius: '50%',
                background: 'var(--accent-gold)',
                boxShadow: '0 0 6px var(--accent-gold)',
              }}
            />
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.68rem',
                letterSpacing: '0.1em',
                color: 'var(--accent-gold)',
              }}
            >
              In active development
            </span>
          </div>

          <h3
            className="display"
            style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', margin: '0 0 16px', lineHeight: 1.1 }}
          >
            Self-Engine
          </h3>

          <p
            style={{
              maxWidth: 520,
              fontSize: '1rem',
              lineHeight: 1.7,
              color: 'var(--text-secondary)',
              margin: '0 0 32px',
            }}
          >
            A personal productivity system — track time, manage projects, understand your finances,
            visualize your calendar. Built for people who want to work with intention.
          </p>

          {/* Feature pills */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginBottom: 36 }}>
            {[
              { icon: <Timer size={14} />, label: 'Time tracking' },
              { icon: <CurrencyCircleDollar size={14} />, label: 'Finance' },
              { icon: <CalendarDots size={14} />, label: 'Calendar' },
              { icon: <Code size={14} />, label: 'Project management' },
            ].map(({ icon, label }) => (
              <span
                key={label}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 6,
                  padding: '5px 12px',
                  borderRadius: 6,
                  background: 'var(--bg-surface)',
                  border: '1px solid var(--border-subtle)',
                  fontSize: '0.78rem',
                  color: 'var(--text-muted)',
                  fontFamily: 'var(--font-mono)',
                  letterSpacing: '0.04em',
                }}
              >
                {icon} {label}
              </span>
            ))}
          </div>

          <Link
            to="/projects"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              fontSize: '0.875rem',
              fontWeight: 500,
              color: 'var(--accent-green)',
              textDecoration: 'none',
              letterSpacing: '0.02em',
              transition: 'gap 0.2s',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.gap = '12px')}
            onMouseLeave={(e) => (e.currentTarget.style.gap = '8px')}
          >
            Learn more <ArrowRight size={15} weight="bold" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}

/* ── About teaser ─────────────────────────────────────────────────────── */
function AboutTeaser() {
  return (
    <section style={{ padding: '120px 28px 0' }}>
      <div
        style={{
          maxWidth: 1080,
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: 60,
          alignItems: 'center',
        }}
      >
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="mono-label">About</span>
          <h2
            className="display"
            style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', margin: '12px 0 24px', lineHeight: 1.1 }}
          >
            Code, practice,<br />
            <em style={{ fontStyle: 'italic', color: 'var(--accent-green)' }}>presence.</em>
          </h2>
          <p style={{ fontSize: '0.975rem', lineHeight: 1.75, color: 'var(--text-secondary)', margin: '0 0 32px' }}>
            I'm Gwydion — a developer and builder from Germany. I care deeply about
            open source, intentional systems, and the intersection of technology and
            inner life. Buddhism shapes how I approach both code and everyday existence.
          </p>
          <Link
            to="/about"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              fontSize: '0.875rem',
              fontWeight: 500,
              color: 'var(--accent-green)',
              textDecoration: 'none',
              transition: 'gap 0.2s',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.gap = '12px')}
            onMouseLeave={(e) => (e.currentTarget.style.gap = '8px')}
          >
            Read more <ArrowRight size={15} weight="bold" />
          </Link>
        </motion.div>

        {/* Decorative block */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          style={{
            aspectRatio: '4/3',
            borderRadius: 20,
            background: 'var(--bg-elevated)',
            border: '1px solid var(--border)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
            position: 'relative',
          }}
        >
          {/* Atmospheric concentric rings */}
          {[1, 2, 3, 4].map((n) => (
            <div
              key={n}
              aria-hidden
              style={{
                position: 'absolute',
                borderRadius: '50%',
                border: `1px solid var(--border)`,
                width: `${n * 22}%`,
                height: `${n * 22}%`,
                opacity: 1 - n * 0.15,
              }}
            />
          ))}
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: '50%',
              background: 'radial-gradient(circle, var(--accent-green-dim) 0%, transparent 70%)',
              border: '1px solid var(--accent-green-dim)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 1,
            }}
          >
            <Leaf size={24} weight="thin" style={{ color: 'var(--accent-green)' }} />
          </div>
          <span
            className="mono-label"
            style={{
              position: 'absolute',
              bottom: 20,
              left: '50%',
              transform: 'translateX(-50%)',
              whiteSpace: 'nowrap',
            }}
          >
            gwydion.dev — {new Date().getFullYear()}
          </span>
        </motion.div>
      </div>
    </section>
  )
}
