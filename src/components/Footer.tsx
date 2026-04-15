import { Link } from '@tanstack/react-router'
import { GithubLogo, ArrowUpRight } from '@phosphor-icons/react'

interface FooterProps {
  lang?: 'en' | 'de'
}

export function Footer({ lang = 'en' }: FooterProps) {
  const year = new Date().getFullYear()

  return (
    <footer
      style={{
        position: 'relative',
        zIndex: 1,
        marginTop: 120,
        borderTop: '1px solid var(--border)',
        padding: '48px 28px 56px',
      }}
    >
      <div
        style={{
          maxWidth: 1080,
          margin: '0 auto',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          gap: 40,
        }}
      >
        {/* Brand */}
        <div>
          <Link
            to="/"
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: '1.35rem',
              fontWeight: 400,
              color: 'var(--text-primary)',
              textDecoration: 'none',
              letterSpacing: '-0.01em',
            }}
          >
            gwydion<span style={{ color: 'var(--accent-gold)' }}>.</span>
          </Link>
          <p
            style={{
              marginTop: 10,
              fontSize: '0.8rem',
              color: 'var(--text-muted)',
              fontFamily: 'var(--font-mono)',
              letterSpacing: '0.05em',
            }}
          >
            {lang === 'de' ? 'Mit Intention gebaut.' : 'Built with intention.'}
          </p>
        </div>

        {/* Nav */}
        <nav style={{ display: 'flex', gap: 40, flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <span className="mono-label">{lang === 'de' ? 'Seiten' : 'Pages'}</span>
            {[
              { href: '/',         en: 'Home',     de: 'Start' },
              { href: '/about',    en: 'About',    de: 'Über mich' },
              { href: '/projects', en: 'Projects', de: 'Projekte' },
            ].map(({ href, en, de }) => (
              <Link key={href} to={href} className="nav-link" style={{ fontSize: '0.875rem' }}>
                {lang === 'de' ? de : en}
              </Link>
            ))}
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <span className="mono-label">{lang === 'de' ? 'Mehr' : 'More'}</span>
            {[
              { href: '/blog',    en: 'Blog',    de: 'Blog' },
              { href: '/contact', en: 'Contact', de: 'Kontakt' },
            ].map(({ href, en, de }) => (
              <Link key={href} to={href} className="nav-link" style={{ fontSize: '0.875rem' }}>
                {lang === 'de' ? de : en}
              </Link>
            ))}
            <a
              href="https://github.com/gwydion"
              target="_blank"
              rel="noopener noreferrer"
              className="nav-link"
              style={{ display: 'inline-flex', alignItems: 'center', gap: 4, fontSize: '0.875rem' }}
            >
              GitHub <ArrowUpRight size={12} />
            </a>
          </div>
        </nav>
      </div>

      {/* Bottom bar */}
      <div
        style={{
          maxWidth: 1080,
          margin: '40px auto 0',
          paddingTop: 20,
          borderTop: '1px solid var(--border-subtle)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: 12,
        }}
      >
        <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
          © {year} Gwydion Braunsdorf
        </span>
        <a
          href="https://github.com/gwydion/gwydion.dev"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 6,
            fontSize: '0.75rem',
            color: 'var(--text-muted)',
            textDecoration: 'none',
            transition: 'color 0.2s',
          }}
        >
          <GithubLogo size={14} weight="light" />
          {lang === 'de' ? 'Quellcode' : 'Source'}
        </a>
      </div>
    </footer>
  )
}
