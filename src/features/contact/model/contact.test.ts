import { describe, expect, it } from 'vite-plus/test'
import { contactSchema, escapeHtml, normalizeEmailSubjectPart } from './contact'

describe('contact helpers', () => {
  it('validates and trims a contact payload', () => {
    const parsed = contactSchema.parse({
      name: '  Gwydion  ',
      email: '  hello@gwydion.dev  ',
      message: '  This is a long enough message for the form.  ',
    })

    expect(parsed).toMatchObject({
      name: 'Gwydion',
      email: 'hello@gwydion.dev',
      message: 'This is a long enough message for the form.',
      topic: '',
      locale: 'en',
      website: '',
    })
  })

  it('accepts an optional contact topic', () => {
    const parsed = contactSchema.parse({
      name: 'Ada Lovelace',
      email: 'ada@example.com',
      message: 'This is a long enough message for the form.',
      topic: 'website',
      locale: 'de',
    })

    expect(parsed.topic).toBe('website')
  })

  it('escapes HTML interpolated into email templates', () => {
    expect(escapeHtml(`<script>alert("x")</script>`)).toBe(
      '&lt;script&gt;alert(&quot;x&quot;)&lt;/script&gt;',
    )
  })

  it('normalizes subject fragments', () => {
    expect(normalizeEmailSubjectPart('Ada\r\nBcc: attacker@example.com')).toBe(
      'Ada Bcc: attacker@example.com',
    )
  })
})
