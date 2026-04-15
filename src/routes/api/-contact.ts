import { createAPIFileRoute } from '@tanstack/react-start/api'
import { Resend } from 'resend'
import {
  contactSchema,
  escapeHtml,
  normalizeEmailSubjectPart,
  type ContactPayload,
} from '../../lib/contact'

const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000
const RATE_LIMIT_MAX = 5
const rateLimits = new Map<string, { count: number; resetAt: number }>()

export const APIRoute = createAPIFileRoute('/api/contact')({
  POST: async ({ request }) => {
    const body = await readJson(request)
    const parsed = contactSchema.safeParse(body)

    if (!parsed.success) {
      return json({ error: 'Invalid input' }, 400)
    }

    if (parsed.data.website) {
      return json({ success: true })
    }

    if (isRateLimited(request)) {
      return json({ error: 'Too many requests' }, 429)
    }

    const { name, email, message } = parsed.data
    const apiKey = process.env['RESEND_API_KEY']

    if (!apiKey) {
      console.error('RESEND_API_KEY not set')
      return json({ error: 'Server configuration error' }, 500)
    }

    const resend = new Resend(apiKey)
    const safe = createSafeEmailParts(parsed.data)

    const { error } = await resend.emails.send({
      from: 'Portfolio Contact <contact@gwydion.dev>',
      to: 'hello@gwydion.dev',
      replyTo: email,
      subject: `New message from ${normalizeEmailSubjectPart(name)}`,
      text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
      html: `
        <div style="font-family:system-ui,sans-serif;max-width:560px;margin:0 auto;color:#101810">
          <h2 style="font-size:1.4rem;margin:0 0 20px">New message from ${safe.name}</h2>
          <table style="width:100%;border-collapse:collapse;margin-bottom:24px">
            <tr>
              <td style="padding:8px 0;color:#3a5244;font-size:0.85rem;width:80px">Name</td>
              <td style="padding:8px 0">${safe.name}</td>
            </tr>
            <tr>
              <td style="padding:8px 0;color:#3a5244;font-size:0.85rem">Email</td>
              <td style="padding:8px 0"><a href="mailto:${safe.email}">${safe.email}</a></td>
            </tr>
          </table>
          <div style="background:#f3efe4;border-radius:10px;padding:20px 24px;white-space:pre-wrap">${safe.message}</div>
          <p style="margin-top:24px;font-size:0.8rem;color:#7a9487">Sent via gwydion.dev</p>
        </div>
      `,
    })

    if (error) {
      console.error('Resend error:', error)
      return json({ error: 'Failed to send' }, 500)
    }

    return json({ success: true })
  },
})

async function readJson(request: Request) {
  try {
    return await request.json()
  } catch {
    return null
  }
}

function json(body: Record<string, unknown>, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json' },
  })
}

function createSafeEmailParts(payload: ContactPayload) {
  return {
    name: escapeHtml(payload.name),
    email: escapeHtml(payload.email),
    message: escapeHtml(payload.message),
  }
}

function isRateLimited(request: Request) {
  const now = Date.now()
  const key = getRateLimitKey(request)
  const current = rateLimits.get(key)

  if (!current || current.resetAt <= now) {
    rateLimits.set(key, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS })
    return false
  }

  current.count += 1
  return current.count > RATE_LIMIT_MAX
}

function getRateLimitKey(request: Request) {
  return (
    request.headers.get('cf-connecting-ip') ??
    request.headers.get('x-real-ip') ??
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ??
    'unknown'
  )
}
