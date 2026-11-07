import { describe, expect, it } from 'vite-plus/test'
import { within } from '@testing-library/dom'
import { fixtureContent } from './contentFixtures'
import { fakeMailer, serveContactEndpoint } from './contactMailer'
import { visit } from './visit'

const MESSAGE = 'I would like to talk about a full-time role.'

async function openContact(url: string, mailer = fakeMailer()) {
  const fetch = serveContactEndpoint(mailer)
  const page = await visit(url, { content: fixtureContent() })
  const main = within(page.main())
  return { page, main, mailer, fetch }
}

describe('The Contact view', () => {
  it('offers email, LinkedIn and GitHub and restates the Availability', async () => {
    const { main } = await openContact('/en/contact')
    const directly = within(main.getByRole('region', { name: 'Directly' }))

    expect(directly.getByRole('link', { name: 'ada@example.com' }).getAttribute('href')).toBe(
      'mailto:ada@example.com',
    )
    expect(directly.getByRole('link', { name: 'GitHub' }).getAttribute('href')).toBe(
      'https://github.com/ada-example',
    )
    // The LinkedIn URL is still a placeholder: named, but not a working link.
    expect(directly.queryByRole('link', { name: 'LinkedIn' })).toBeNull()
    expect(directly.getByText('LinkedIn')).toBeTruthy()
    const availability = main.getByRole('region', { name: 'Availability' })
    expect(availability.textContent).toContain('Open to fixtures')
    expect(availability.textContent).toContain('Also fixtures on the side')
  })

  it('has no topic choice', async () => {
    const { main } = await openContact('/en/contact')

    expect(main.queryByRole('combobox')).toBeNull()
    expect(main.getAllByRole('textbox').map((field) => field.getAttribute('name'))).toEqual([
      'name',
      'email',
      'message',
    ])
  })

  it('delivers a valid message and confirms it', async () => {
    const { page, main, mailer } = await openContact('/en/contact')

    await page.fill(main.getByLabelText('Name'), 'Ada Lovelace')
    await page.fill(main.getByLabelText('Email'), 'ada@example.com')
    await page.fill(main.getByLabelText('Message'), MESSAGE)
    await page.click(main.getByRole('button', { name: 'Send message' }))

    expect(main.getByRole('status').textContent).toContain("Message sent. I'll get back to you.")
    expect(mailer.sent).toHaveLength(1)
    expect(mailer.sent[0]?.replyTo).toBe('ada@example.com')
    expect(mailer.sent[0]?.text).toContain('Language: English')
  })

  it('carries the German Site language and confirms in German', async () => {
    const { page, main, mailer } = await openContact('/de/contact')

    await page.fill(main.getByLabelText('Name'), 'Ada Lovelace')
    await page.fill(main.getByLabelText('E-Mail'), 'ada@example.com')
    await page.fill(main.getByLabelText('Nachricht'), MESSAGE)
    await page.click(main.getByRole('button', { name: 'Nachricht senden' }))

    expect(main.getByRole('status').textContent).toContain('Nachricht gesendet.')
    expect(mailer.sent[0]?.text).toContain('Language: Deutsch')
  })

  it('shows field-level messages in German for invalid input and sends nothing', async () => {
    const { page, main, fetch } = await openContact('/de/contact')

    await page.fill(main.getByLabelText('Name'), 'A')
    await page.fill(main.getByLabelText('E-Mail'), 'keine-adresse')
    await page.fill(main.getByLabelText('Nachricht'), 'Zu kurz.')
    await page.click(main.getByRole('button', { name: 'Nachricht senden' }))

    const name = main.getByLabelText('Name')
    expect(name.getAttribute('aria-invalid')).toBe('true')
    expect(name.getAttribute('aria-errormessage')).toBeTruthy()
    expect(document.getElementById(name.getAttribute('aria-errormessage') ?? '')?.textContent).toBe(
      'Bitte gib deinen Namen ein (2 bis 120 Zeichen).',
    )
    expect(main.getByText('Gib eine gültige E-Mail-Adresse ein.')).toBeTruthy()
    expect(main.getByText('Die Nachricht ist zu kurz (mindestens 20 Zeichen).')).toBeTruthy()
    expect(fetch).not.toHaveBeenCalled()
  })

  it.each([
    ['/en/contact', 'Send message', 'Privacy policy', '/en/datenschutz'],
    ['/de/contact', 'Nachricht senden', 'Datenschutzerklärung', '/de/datenschutz'],
  ])('%s links to the privacy policy under the form', async (url, send, privacy, href) => {
    const { main } = await openContact(url)

    const form = main.getByRole('button', { name: send }).closest('form')
    if (!form) throw new Error('The send button is not in a form')
    expect(within(form).getByRole('link', { name: privacy }).getAttribute('href')).toBe(href)
  })

  it('silently accepts a filled honeypot and delivers nothing', async () => {
    const { page, main, mailer } = await openContact('/en/contact')

    await page.fill(main.getByLabelText('Name'), 'Spam Bot')
    await page.fill(main.getByLabelText('Email'), 'bot@example.com')
    await page.fill(main.getByLabelText('Message'), MESSAGE)
    const honeypot = page.main().querySelector<HTMLInputElement>('input[name="website"]')
    if (!honeypot) throw new Error('The form has no honeypot field')
    await page.fill(honeypot, 'https://spam.example')
    await page.click(main.getByRole('button', { name: 'Send message' }))

    expect(main.getByRole('status').textContent).toContain('Message sent.')
    expect(mailer.sent).toEqual([])
  })

  it('shows a sending state while the message is on its way', async () => {
    const { page, main, fetch } = await openContact('/en/contact')
    let answer: (response: Response) => void = () => {}
    fetch.mockImplementation(() => new Promise((resolve) => (answer = resolve)))

    await page.fill(main.getByLabelText('Name'), 'Ada Lovelace')
    await page.fill(main.getByLabelText('Email'), 'ada@example.com')
    await page.fill(main.getByLabelText('Message'), MESSAGE)
    await page.click(main.getByRole('button', { name: 'Send message' }))

    const button = main.getByRole('button', { name: 'Sending…' }) as HTMLButtonElement
    expect(button.disabled).toBe(true)
    await page.settle(() => answer(Response.json({ ok: true })))
    expect(main.getByRole('status').textContent).toContain('Message sent.')
  })

  it('shows an error with the email address as a fallback when delivery fails', async () => {
    const { page, main } = await openContact('/en/contact', fakeMailer({ fails: true }))

    await page.fill(main.getByLabelText('Name'), 'Ada Lovelace')
    await page.fill(main.getByLabelText('Email'), 'ada@example.com')
    await page.fill(main.getByLabelText('Message'), MESSAGE)
    await page.click(main.getByRole('button', { name: 'Send message' }))

    const alert = main.getByRole('alert')
    expect(alert.textContent).toContain('could not be sent')
    expect(within(alert).getByRole('link', { name: 'ada@example.com' }).getAttribute('href')).toBe(
      'mailto:ada@example.com',
    )
    // What the visitor typed is kept, ready to try again.
    expect((main.getByLabelText('Message') as HTMLTextAreaElement).value).toBe(MESSAGE)
  })
})

describe('"Get in touch"', () => {
  it.each(['/en', '/en/projects', '/en/about', '/en/contact', '/en/nowhere', '/de', '/de/about'])(
    'leads from %s to the Contact view',
    async (url) => {
      const page = await visit(url, { content: fixtureContent() })
      const lang = url.slice(1, 3)
      const name = lang === 'de' ? 'Kontakt aufnehmen' : 'Get in touch'

      await page.click(within(page.main()).getByRole('link', { name }))

      expect(page.path()).toBe(`/${lang}/contact`)
      expect(page.title()).toBe(lang === 'de' ? 'Kontakt' : 'Contact')
    },
  )
})
