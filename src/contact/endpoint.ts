import { composeContactEmail, type ContactEmail } from './email'
import { isHoneypotFilled, validateContactMessage, type ContactFieldErrors } from './message'

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

    const { ok } = await mailer.send(composeContactEmail(validation.message))
    return ok ? json({ ok: true }) : json({ error: 'delivery-failed' }, 502)
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
