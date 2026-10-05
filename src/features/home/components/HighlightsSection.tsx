import { Link } from '@tanstack/react-router'
import { ArrowRightIcon } from '@phosphor-icons/react'
import * as m from '#/generated/paraglide/messages'
import { SELF_ENGINE_NUMBERS } from '#/features/projects/self-engine/content/numbers'
import { SELF_ENGINE_TECH } from '#/features/projects/self-engine/content/tech'
import { HomeSection } from './HomeSection'

function getHighlights() {
  return [
    { title: m.home_highlight_sync_title(), desc: m.home_highlight_sync_desc() },
    { title: m.home_highlight_domain_title(), desc: m.home_highlight_domain_desc() },
    { title: m.home_highlight_ai_title(), desc: m.home_highlight_ai_desc() },
  ]
}

export function HighlightsSection() {
  return (
    <HomeSection id="highlights">
      <p className="home-body">{m.home_highlights_intro()}</p>

      <dl className="home-stats">
        {SELF_ENGINE_NUMBERS.map(({ value, label }) => (
          <div key={label()} className="home-stat">
            <dt>{label()}</dt>
            <dd>{value()}</dd>
          </div>
        ))}
      </dl>

      <ul className="home-highlights">
        {getHighlights().map(({ title, desc }) => (
          <li key={title}>
            <h3>{title}</h3>
            <p>{desc}</p>
          </li>
        ))}
      </ul>

      <h3 className="home-subheading">{m.home_stack_heading()}</h3>
      <ul className="home-chips">
        {SELF_ENGINE_TECH.map((tech) => (
          <li key={tech} className="home-chip">
            {tech}
          </li>
        ))}
      </ul>

      <Link to="/self-engine" className="home-arrow-link">
        {m.home_highlights_cta()} <ArrowRightIcon size={14} weight="bold" aria-hidden />
      </Link>
    </HomeSection>
  )
}
