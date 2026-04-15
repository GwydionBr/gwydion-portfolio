import { z } from 'zod'

export const contactLimits = {
  nameMin: 2,
  nameMax: 120,
  emailMax: 254,
  messageMin: 20,
  messageMax: 5000,
} as const

export const contactSchema = z.object({
  name: z.string().trim().min(contactLimits.nameMin).max(contactLimits.nameMax),
  email: z.string().trim().email().max(contactLimits.emailMax),
  message: z.string().trim().min(contactLimits.messageMin).max(contactLimits.messageMax),
  website: z.string().trim().max(200).optional().default(''),
})

export type ContactForm = z.input<typeof contactSchema>
export type ContactPayload = z.output<typeof contactSchema>

export function escapeHtml(value: string) {
  return value.replace(/[&<>"']/g, (char) => {
    switch (char) {
      case '&':
        return '&amp;'
      case '<':
        return '&lt;'
      case '>':
        return '&gt;'
      case '"':
        return '&quot;'
      case "'":
        return '&#39;'
      default:
        return char
    }
  })
}

export function normalizeEmailSubjectPart(value: string) {
  return value.replace(/[\r\n]+/g, ' ').trim().slice(0, contactLimits.nameMax)
}
