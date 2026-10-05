import { EnvelopeSimpleIcon, GithubLogoIcon } from '@phosphor-icons/react'
import * as m from '#/generated/paraglide/messages'
import { CONTACT_EMAIL_HREF, GITHUB_PROFILE_URL } from '#/shared/config/links'
import { useScrollSpy } from '#/shared/hooks/useScrollSpy'
import { Reveal } from '#/shared/motion'
import { DisplayTitle } from '#/shared/ui/Page'
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
            <DisplayTitle order={1} size="clamp(2.4rem, 3.6vw, 3.4rem)">
              Gwydion
              <br />
              Braunsdorf
            </DisplayTitle>
          </div>
        </div>
        <p className="home-tagline">{m.home_tagline()}</p>
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
