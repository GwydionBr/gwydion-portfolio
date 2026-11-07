import { vi } from 'vite-plus/test'
import { createContactEndpoint, type ContactEmail } from '#/contact/endpoint'

/** A mailer that records what it would deliver, or fails every delivery. */
export function fakeMailer({ fails = false } = {}) {
  const sent: ContactEmail[] = []
  return {
    sent,
    async send(email: ContactEmail) {
      if (fails) return { ok: false }
      sent.push(email)
      return { ok: true }
    },
  }
}

/**
 * Answers the page's `fetch('/api/contact')` with the real contact endpoint
 * over `mailer`, so a seam test runs form, endpoint and validation end to end.
 */
export function serveContactEndpoint(mailer: ReturnType<typeof fakeMailer>) {
  const endpoint = createContactEndpoint({ mailer })
  return vi
    .spyOn(globalThis, 'fetch')
    .mockImplementation((input, init) =>
      endpoint(
        input instanceof Request ? input : new Request(new URL(input, 'https://gwydion.dev'), init),
      ),
    )
}
