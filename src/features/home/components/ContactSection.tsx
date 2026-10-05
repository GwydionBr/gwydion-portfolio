import { Link } from '@tanstack/react-router'
import { ArrowRightIcon } from '@phosphor-icons/react'
import * as m from '#/generated/paraglide/messages'
import { CONTACT_EMAIL, CONTACT_EMAIL_HREF } from '#/shared/config/links'
import { HomeSection } from './HomeSection'

export function ContactSection() {
  return (
    <HomeSection id="contact">
      <div className="home-contact">
        <p className="home-contact-title">{m.home_contact_title()}</p>
        <p className="home-body">{m.home_contact_desc()}</p>
        <div className="home-contact-actions">
          <Link to="/contact" className="home-button">
            {m.home_contact_cta()} <ArrowRightIcon size={14} weight="bold" aria-hidden />
          </Link>
          <a href={CONTACT_EMAIL_HREF} className="home-arrow-link">
            {CONTACT_EMAIL}
          </a>
        </div>
      </div>
    </HomeSection>
  )
}
