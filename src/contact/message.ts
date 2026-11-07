import { z } from 'zod'
import { msg } from '@lingui/core/macro'
import { BASE_LANGUAGE, LANGUAGES, type Language } from '#/i18n/language'
import { i18nFor } from '#/i18n/runtime'

/**
 * A contact message: what a Recruiter or Client sends through the Contact
 * view. The same validation runs in the browser (field messages before
 * sending) and in the endpoint (the only one that counts), so both answer
 * alike and in the Site language the message was written in.
 */

export const CONTACT_LIMITS = {
  nameMin: 2,
  nameMax: 120,
  emailMax: 254,
  messageMin: 20,
  messageMax: 5000,
} as const

/** The Site language the message was written in, else the Base language; Gwydion answers in it. */
const languageSchema = z.enum(LANGUAGES).catch(BASE_LANGUAGE)

/** Just the language of untrusted input, so field messages of an invalid message come out in it. */
const languageOnlySchema = z.object({ language: languageSchema }).catch({ language: BASE_LANGUAGE })

const contactMessageSchema = z.object({
  name: z.string().trim().min(CONTACT_LIMITS.nameMin).max(CONTACT_LIMITS.nameMax),
  email: z.string().trim().pipe(z.email().max(CONTACT_LIMITS.emailMax)),
  message: z.string().trim().min(CONTACT_LIMITS.messageMin).max(CONTACT_LIMITS.messageMax),
  language: languageSchema,
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

  const { language } = languageOnlySchema.parse(input)
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
