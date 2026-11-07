import { z } from 'zod'
import { msg } from '@lingui/core/macro'
import { BASE_LANGUAGE, isLanguage, LANGUAGES, type Language } from '#/i18n/language'
import { i18nFor } from '#/i18n/runtime'

/**
 * A contact message: what a visitor sends through the Contact view. The same
 * validation runs in the browser (field messages before sending) and in the
 * endpoint (the only one that counts), so both answer alike and in the
 * visitor's Site language.
 */

export const CONTACT_LIMITS = {
  nameMin: 2,
  nameMax: 120,
  emailMax: 254,
  messageMin: 20,
  messageMax: 5000,
} as const

const contactMessageSchema = z.object({
  name: z.string().trim().min(CONTACT_LIMITS.nameMin).max(CONTACT_LIMITS.nameMax),
  email: z.string().trim().pipe(z.email().max(CONTACT_LIMITS.emailMax)),
  message: z.string().trim().min(CONTACT_LIMITS.messageMin).max(CONTACT_LIMITS.messageMax),
  /** The Site language the visitor wrote in; Gwydion answers in it. */
  language: z.enum(LANGUAGES).catch(BASE_LANGUAGE),
  /** The honeypot (see `isHoneypotFilled`); the endpoint checks it before validating. */
  website: z.string().optional().default(''),
})

export type ContactMessage = z.output<typeof contactMessageSchema>
export type ContactField = 'name' | 'email' | 'message'
export type ContactFieldErrors = Partial<Record<ContactField, string>>

export type ContactValidation =
  | { ok: true; message: ContactMessage }
  | { ok: false; language: Language; fieldErrors: ContactFieldErrors }

const FIELDS: readonly ContactField[] = ['name', 'email', 'message']

/**
 * Whether untrusted input filled in the honeypot field `website`: hidden from
 * people, filled in by bots. Such a message is accepted silently and dropped,
 * whatever else it contains.
 */
export function isHoneypotFilled(input: unknown): boolean {
  const website =
    typeof input === 'object' && input !== null && 'website' in input ? input.website : undefined
  return typeof website === 'string' ? website.trim() !== '' : website != null
}

/** Validates untrusted input (form values or a request body) into a contact message. */
export function validateContactMessage(input: unknown): ContactValidation {
  const parsed = contactMessageSchema.safeParse(input)
  if (parsed.success) return { ok: true, message: parsed.data }

  const language = languageOf(input)
  const i18n = i18nFor(language)
  const fieldErrors: ContactFieldErrors = {}
  for (const issue of parsed.error.issues) {
    const field = FIELDS.find((name) => name === issue.path[0])
    if (!field || fieldErrors[field]) continue
    fieldErrors[field] = i18n._(fieldMessage(field, issue.code))
  }
  return { ok: false, language, fieldErrors }
}

function fieldMessage(field: ContactField, code: string) {
  const { nameMin, nameMax, messageMin, messageMax } = CONTACT_LIMITS
  switch (field) {
    case 'name':
      return msg`Please enter your name (${nameMin} to ${nameMax} characters).`
    case 'email':
      return msg`Enter a valid email address.`
    case 'message':
      return code === 'too_big'
        ? msg`The message is too long (at most ${messageMax} characters).`
        : msg`The message is too short (at least ${messageMin} characters).`
  }
}

function languageOf(input: unknown): Language {
  const language =
    typeof input === 'object' && input !== null && 'language' in input ? input.language : undefined
  return isLanguage(language) ? language : BASE_LANGUAGE
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
