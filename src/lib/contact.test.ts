import { describe, expect, it } from 'vitest'
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
      website: '',
    })
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
