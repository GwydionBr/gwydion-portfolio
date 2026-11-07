import { nativeNameOf } from '#/i18n/language'
import {
  escapeHtml,
  isHoneypotFilled,
  normalizeEmailSubjectPart,
  validateContactMessage,
  type ContactFieldErrors,
  type ContactMessage,
} from './message'

/** The email a contact message becomes, addressed to Gwydion. */
export interface ContactEmail {
  replyTo: string
  subject: string
  text: string
  html: string
}

/** Delivers contact emails (Resend in production, `./resend.ts`). */
export interface ContactMailer {
  send(email: ContactEmail): Promise<{ ok: boolean }>
}

/** What `POST /api/contact` answers; the Contact view reads it. */
export type ContactResponse =
  | { ok: true }
  | { fieldErrors: ContactFieldErrors }
  | { error: 'invalid' | 'rate-limited' | 'not-configured' | 'delivery-failed' }

const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000
const RATE_LIMIT_MAX = 5

/**
 * The contact endpoint: drops a message silently when the honeypot is filled,
 * validates the rest (field messages in its Site language), limits each
 * sender, and hands the email to `mailer`. `mailer` is null when the mail
 * configuration is missing.
 */
export function createContactEndpoint({ mailer }: { mailer: ContactMailer | null }) {
  const isRateLimited = createRateLimiter()

  return async (request: Request): Promise<Response> => {
    const body = await readJson(request)
    if (body === undefined) return json({ error: 'invalid' }, 400)

    if (isHoneypotFilled(body)) return json({ ok: true })
    const validation = validateContactMessage(body)
    if (!validation.ok) return json({ fieldErrors: validation.fieldErrors }, 400)
    if (isRateLimited(senderOf(request))) return json({ error: 'rate-limited' }, 429)
    if (!mailer) return json({ error: 'not-configured' }, 500)

    const { ok } = await mailer.send(composeEmail(validation.message))
    return ok ? json({ ok: true }) : json({ error: 'delivery-failed' }, 502)
  }
}

function composeEmail({ name, email, message, language }: ContactMessage): ContactEmail {
  const languageName = nativeNameOf(language)
  const safe = { name: escapeHtml(name), email: escapeHtml(email), message: escapeHtml(message) }
  const row = (label: string, value: string) =>
    `<tr><td style="padding:8px 0;color:#525252;font-size:0.85rem;width:96px">${label}</td><td style="padding:8px 0">${value}</td></tr>`

  return {
    replyTo: email,
    subject: `New message from ${normalizeEmailSubjectPart(name)} (${languageName})`,
    text: `Name: ${name}\nEmail: ${email}\nLanguage: ${languageName}\n\nMessage:\n${message}`,
    html: `<div style="font-family:system-ui,sans-serif;max-width:560px;margin:0 auto;color:#171717">
  <h2 style="font-size:1.4rem;margin:0 0 20px">New message from ${safe.name}</h2>
  <table style="width:100%;border-collapse:collapse;margin-bottom:24px">
    ${row('Name', safe.name)}
    ${row('Email', `<a href="mailto:${safe.email}">${safe.email}</a>`)}
    ${row('Language', languageName)}
  </table>
  <div style="background:#f5f5f5;border-radius:10px;padding:20px 24px;white-space:pre-wrap">${safe.message}</div>
  <p style="margin-top:24px;font-size:0.8rem;color:#737373">Sent via gwydion.dev</p>
</div>`,
  }
}

/** Whether a sender has sent more than five messages in the last ten minutes. */
function createRateLimiter() {
  const senders = new Map<string, { count: number; resetAt: number }>()
  return (sender: string) => {
    const now = Date.now()
    const current = senders.get(sender)
    if (!current || current.resetAt <= now) {
      senders.set(sender, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS })
      return false
    }
    current.count += 1
    return current.count > RATE_LIMIT_MAX
  }
}

function senderOf(request: Request) {
  return (
    request.headers.get('cf-connecting-ip') ??
    request.headers.get('x-real-ip') ??
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ??
    'unknown'
  )
}

async function readJson(request: Request): Promise<unknown> {
  try {
    return (await request.json()) as unknown
  } catch {
    return undefined
  }
}

function json(body: ContactResponse, status = 200) {
  return Response.json(body, { status })
}
