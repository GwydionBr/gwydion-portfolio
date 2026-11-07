import { describe, expect, it } from 'vite-plus/test'
import { LANGUAGES } from '#/i18n/language'
import { PRIVACY } from './privacy'

const textOf = (language: 'en' | 'de', id: string) =>
  PRIVACY[language]
    .filter((section) => section.id === id)
    .flatMap((section) => section.paragraphs)
    .join('\n')

describe('The privacy policy', () => {
  it('has the same sections and paragraph counts in every Site language', () => {
    const shape = (language: 'en' | 'de') =>
      PRIVACY[language].map((section) => [section.id, section.paragraphs.length])
    expect(shape('en')).toEqual(shape('de'))
  })

  it('uses unique section ids, since they double as anchor targets', () => {
    const ids = PRIVACY.de.map((section) => section.id)
    expect(new Set(ids).size).toBe(ids.length)
  })

  it.each(LANGUAGES)('names the theme choice the site stores on the device (%s)', (language) => {
    const preferences = textOf(language, 'preferences')
    // The key and values the theme toggle writes (src/theme/theme.ts).
    expect(preferences).toContain('localStorage')
    expect(preferences).toMatch(/[„“"]theme[“”"]/)
    expect(preferences).toMatch(/light/)
    expect(preferences).toMatch(/dark/)
  })

  it.each(LANGUAGES)('describes the contact form the new site has (%s)', (language) => {
    const contact = textOf(language, 'contact')
    expect(contact).toContain('Resend')
    expect(contact).toMatch(/Frankfurt/)
    // The topic choice is gone from the form (spec #31).
    expect(contact).not.toMatch(/\b(topic|Thema)\b/)
  })

  it.each(LANGUAGES)('describes the analytics the site runs (%s)', (language) => {
    expect(textOf(language, 'analytics')).toContain('Vercel Web Analytics')
  })

  it.each(LANGUAGES)('mentions nothing only the old site did (%s)', (language) => {
    const text = JSON.stringify(PRIVACY[language])
    expect(text).not.toMatch(/paraglide/i)
  })

  it.each(LANGUAGES)(
    'describes the booking request portal but not the retired Google Drive delivery (%s)',
    (language) => {
      expect(textOf(language, 'portal')).toContain('Supabase')
      // Studio sites deliver booking requests only through the portal since tattoo-sites #188.
      expect(JSON.stringify(PRIVACY[language])).not.toMatch(
        /google.?drive|drive\.file|Terminanfragen“? \(/i,
      )
    },
  )
})
