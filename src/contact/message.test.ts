import { describe, expect, it } from 'vite-plus/test'
import { validateContactMessage } from './message'

const valid = {
  name: '  Ada Lovelace  ',
  email: '  ada@example.com  ',
  message: '  This is a long enough message for the form.  ',
  language: 'en',
}

describe('A contact message', () => {
  it('is validated and trimmed', () => {
    expect(validateContactMessage(valid)).toEqual({
      ok: true,
      message: {
        name: 'Ada Lovelace',
        email: 'ada@example.com',
        message: 'This is a long enough message for the form.',
        language: 'en',
        website: '',
      },
    })
  })

  it('carries the Site language it was written in', () => {
    const result = validateContactMessage({ ...valid, language: 'de' })

    expect(result.ok && result.message.language).toBe('de')
  })

  it('no longer has a topic', () => {
    const result = validateContactMessage({ ...valid, topic: 'website' })

    expect(result.ok && result.message).not.toHaveProperty('topic')
  })

  it('names every invalid field, in English', () => {
    expect(
      validateContactMessage({ name: 'A', email: 'nope', message: 'Too short.', language: 'en' }),
    ).toEqual({
      ok: false,
      language: 'en',
      fieldErrors: {
        name: 'Please enter your name (2 to 120 characters).',
        email: 'Enter a valid email address.',
        message: 'The message is too short (at least 20 characters).',
      },
    })
  })

  it('names every invalid field in German for a message written in German', () => {
    expect(
      validateContactMessage({ name: '', email: '', message: 'x'.repeat(5001), language: 'de' }),
    ).toMatchObject({
      ok: false,
      language: 'de',
      fieldErrors: {
        name: 'Bitte gib deinen Namen ein (2 bis 120 Zeichen).',
        email: 'Gib eine gültige E-Mail-Adresse ein.',
        message: 'Die Nachricht ist zu lang (höchstens 5000 Zeichen).',
      },
    })
  })

  it('falls back to the base language for an unknown language', () => {
    const result = validateContactMessage({ ...valid, language: 'fr' })

    expect(result.ok && result.message.language).toBe('en')
  })

  it('fails as a whole when it is not an object', () => {
    expect(validateContactMessage(null)).toMatchObject({ ok: false, language: 'en' })
  })
})
