import { nativeNameOf } from '#/i18n/language'
import { CONTACT_LIMITS, type ContactMessage } from './message'

/** The email a contact message becomes, addressed to Gwydion. */
export interface ContactEmail {
  replyTo: string
  subject: string
  text: string
  html: string
}

/** The email for `message`: what was typed, escaped in the HTML, with its Site language named. */
export function composeContactEmail({
  name,
  email,
  message,
  language,
}: ContactMessage): ContactEmail {
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

export function escapeHtml(value: string) {
  return value.replace(/[&<>"']/g, (char) => HTML_ESCAPES[char] ?? char)
}

const HTML_ESCAPES: Record<string, string> = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;',
}

/** Keeps a header injection out of the subject: one line, bounded length. */
export function normalizeEmailSubjectPart(value: string) {
  return value
    .replace(/[\r\n]+/g, ' ')
    .trim()
    .slice(0, CONTACT_LIMITS.nameMax)
}
