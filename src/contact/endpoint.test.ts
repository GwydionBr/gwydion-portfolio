import { describe, expect, it } from 'vite-plus/test'
import { fakeMailer } from '#/test/contactMailer'
import { createContactEndpoint } from './endpoint'

const VALID = {
  name: 'Ada Lovelace',
  email: 'ada@example.com',
  message: 'I would like to talk about a full-time role.',
  language: 'de',
}

const post = (body: unknown, headers: Record<string, string> = {}) =>
  new Request('https://gwydion.dev/api/contact', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...headers },
    body: typeof body === 'string' ? body : JSON.stringify(body),
  })

describe('The contact endpoint', () => {
  it('delivers a valid message as an email that carries its Site language', async () => {
    const mailer = fakeMailer()
    const response = await createContactEndpoint({ mailer })(post(VALID))

    expect(response.status).toBe(200)
    expect(await response.json()).toEqual({ ok: true })
    expect(mailer.sent).toHaveLength(1)
    const [email] = mailer.sent
    expect(email).toMatchObject({
      replyTo: 'ada@example.com',
      subject: 'New message from Ada Lovelace (Deutsch)',
    })
    expect(email?.text).toContain('Language: Deutsch')
    expect(email?.text).toContain(VALID.message)
    expect(email?.html).toContain('Deutsch')
  })

  it('escapes what the visitor typed in the HTML and keeps the subject on one line', async () => {
    const mailer = fakeMailer()
    await createContactEndpoint({ mailer })(
      post({ ...VALID, name: 'Ada\r\nBcc: x@example.com', message: '<script>alert(1)</script>!!' }),
    )

    const [email] = mailer.sent
    expect(email?.subject).toBe('New message from Ada Bcc: x@example.com (Deutsch)')
    expect(email?.html).toContain('&lt;script&gt;alert(1)&lt;/script&gt;')
    expect(email?.html).not.toContain('<script>')
  })

  it('rejects invalid input with field messages in its Site language and sends nothing', async () => {
    const mailer = fakeMailer()
    const response = await createContactEndpoint({ mailer })(post({ ...VALID, email: 'nope' }))

    expect(response.status).toBe(400)
    expect(await response.json()).toEqual({
      fieldErrors: { email: 'Gib eine gültige E-Mail-Adresse ein.' },
    })
    expect(mailer.sent).toEqual([])
  })

  it('rejects a body that is not JSON', async () => {
    const response = await createContactEndpoint({ mailer: fakeMailer() })(post('not json'))

    expect(response.status).toBe(400)
  })

  it('silently accepts a filled honeypot and delivers nothing', async () => {
    const mailer = fakeMailer()
    const response = await createContactEndpoint({ mailer })(
      post({ ...VALID, website: 'https://spam.example' }),
    )

    expect(response.status).toBe(200)
    expect(await response.json()).toEqual({ ok: true })
    expect(mailer.sent).toEqual([])
  })

  it('silently accepts a filled honeypot even when the rest of the message is invalid', async () => {
    const mailer = fakeMailer()
    const endpoint = createContactEndpoint({ mailer })

    for (const body of [
      { ...VALID, email: 'nope', website: 'https://spam.example' },
      { ...VALID, website: 'x'.repeat(500) },
    ]) {
      const response = await endpoint(post(body))
      expect(response.status).toBe(200)
      expect(await response.json()).toEqual({ ok: true })
    }
    expect(mailer.sent).toEqual([])
  })

  it('reports a failed delivery', async () => {
    const response = await createContactEndpoint({ mailer: fakeMailer({ fails: true }) })(
      post(VALID),
    )

    expect(response.status).toBe(502)
  })

  it('reports a missing mail configuration', async () => {
    const response = await createContactEndpoint({ mailer: null })(post(VALID))

    expect(response.status).toBe(500)
  })

  it('limits one sender to five messages in ten minutes', async () => {
    const mailer = fakeMailer()
    const endpoint = createContactEndpoint({ mailer })
    const from = { 'x-forwarded-for': '203.0.113.7, 10.0.0.1' }

    for (let i = 0; i < 5; i++) expect((await endpoint(post(VALID, from))).status).toBe(200)
    expect((await endpoint(post(VALID, from))).status).toBe(429)
    expect((await endpoint(post(VALID, { 'x-forwarded-for': '203.0.113.8' }))).status).toBe(200)
    expect(mailer.sent).toHaveLength(6)
  })
})
