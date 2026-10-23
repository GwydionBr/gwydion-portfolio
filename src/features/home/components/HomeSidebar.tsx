import { Link } from '@tanstack/react-router'
import { EnvelopeSimpleIcon, GithubLogoIcon } from '@phosphor-icons/react'
import * as m from '#/generated/paraglide/messages'
import { CONTACT_EMAIL_HREF, GITHUB_PROFILE_URL, SELF_ENGINE_URL } from '#/shared/config/links'
import { useScrollSpy } from '#/shared/hooks/useScrollSpy'
import { Reveal } from '#/shared/motion'
import { HOME_SECTION_IDS, HOME_SECTION_LABELS } from '../content/sections'

export function HomeSidebar() {
  const activeId = useScrollSpy(HOME_SECTION_IDS)

  return (
    <aside className="home-sidebar">
      <Reveal distance={20} duration={0.8}>
        <div className="home-identity">
          <img
            className="home-portrait"
            src="/portrait.webp"
            alt={m.home_portrait_alt()}
            width={104}
            height={104}
            fetchPriority="high"
          />
          <div>
            <span className="home-role">{m.home_role()}</span>
            <p className="home-name">Gwydion Braunsdorf</p>
          </div>
        </div>
        <h1 className="home-hero-title">{m.home_hero_title()}</h1>
        <p className="home-hero-subline">{m.home_hero_subline()}</p>
        <div className="home-hero-actions">
          <Link to="/contact" className="home-button">
            {m.home_hero_cta_contact()}
          </Link>
          <a
            href={SELF_ENGINE_URL}
            className="home-button home-button-secondary"
            target="_blank"
            rel="noopener noreferrer"
          >
            {m.home_hero_cta_self_engine()}
          </a>
        </div>
      </Reveal>

      <nav aria-label={m.home_nav_label()}>
        <ul className="home-nav">
          {HOME_SECTION_IDS.map((id) => (
            <li key={id}>
              <a
                href={`#${id}`}
                className="home-nav-link"
                aria-current={activeId === id ? 'location' : undefined}
              >
                {HOME_SECTION_LABELS[id]()}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <div className="home-social">
        <a
          href={GITHUB_PROFILE_URL}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={m.header_github()}
        >
          <GithubLogoIcon size={22} weight="light" aria-hidden />
        </a>
        <a href={CONTACT_EMAIL_HREF} aria-label={m.home_email_label()}>
          <EnvelopeSimpleIcon size={22} weight="light" aria-hidden />
        </a>
      </div>
    </aside>
  )
}
