import { Resend } from 'resend'
import type { ContactMailer } from './endpoint'

/**
 * The production mailer: Resend, configured by `RESEND_API_KEY`,
 * `CONTACT_FROM_EMAIL` and `CONTACT_TO_EMAIL`. Null when any is missing. The
 * function runs in Frankfurt (`fra1`, vite.config.ts), so the message stays in
 * the EU on its way to Resend.
 */
export function resendMailerFromEnv(env = process.env): ContactMailer | null {
  const apiKey = env['RESEND_API_KEY']
  const from = env['CONTACT_FROM_EMAIL']
  const to = env['CONTACT_TO_EMAIL']
  if (!apiKey || !from || !to) {
    console.error('Contact form needs RESEND_API_KEY, CONTACT_FROM_EMAIL and CONTACT_TO_EMAIL')
    return null
  }

  const resend = new Resend(apiKey)
  return {
    async send(email) {
      const { error } = await resend.emails.send({ from, to, ...email })
      if (error) console.error('Resend error:', error)
      return { ok: !error }
    },
  }
}
