import type { Profile } from '#/content'
import type { Language } from '#/i18n/language'
import { absoluteUrl, pageUrl } from './urls'

/** Gwydion's portrait, the Person's image. */
const PORTRAIT = '/portrait.webp'

/**
 * Schema.org Person data describing Gwydion, built from the Profile in
 * `language`. Placeholder links are left out: they point nowhere real yet.
 */
export function buildPersonData(profile: Profile, language: Language) {
  const links = profile.links.filter((link) => !link.placeholder)
  const email = links.find((link) => link.kind === 'email')?.href.replace(/^mailto:/, '')
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': absoluteUrl('/#person'),
    name: profile.name,
    url: pageUrl('/', language),
    image: absoluteUrl(PORTRAIT),
    jobTitle: profile.role,
    description: profile.pitch,
    ...(email && { email }),
    knowsAbout: profile.skills,
    sameAs: links.filter((link) => link.kind !== 'email').map((link) => link.href),
  }
}

/** `data` as a head script for `head().scripts`, safe to inline in HTML. */
export function jsonLdScript(data: object) {
  return {
    type: 'application/ld+json',
    // `<` escaped so no text in the data can close the script element.
    children: JSON.stringify(data).replace(/</g, '\\u003c'),
  }
}
