import { describe, expect, it } from 'vite-plus/test'
import { escapeHtml, normalizeEmailSubjectPart } from './email'

describe('Email helpers', () => {
  it('escape HTML interpolated into email templates', () => {
    expect(escapeHtml(`<script>alert("x")</script>`)).toBe(
      '&lt;script&gt;alert(&quot;x&quot;)&lt;/script&gt;',
    )
  })

  it('normalize subject fragments', () => {
    expect(normalizeEmailSubjectPart('Ada\r\nBcc: attacker@example.com')).toBe(
      'Ada Bcc: attacker@example.com',
    )
  })
})
