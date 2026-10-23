import { z } from 'zod'

export const contactLimits = {
  nameMin: 2,
  nameMax: 120,
  emailMax: 254,
  messageMin: 20,
  messageMax: 5000,
} as const

export const contactTopicValues = ['website', 'app', 'self_engine', 'other'] as const
export type ContactTopic = (typeof contactTopicValues)[number]

export const contactSchema = z.object({
  name: z.string().trim().min(contactLimits.nameMin).max(contactLimits.nameMax),
  email: z.string().trim().email().max(contactLimits.emailMax),
  message: z.string().trim().min(contactLimits.messageMin).max(contactLimits.messageMax),
  topic: z
    .union([z.enum(contactTopicValues), z.literal('')])
    .optional()
    .default(''),
  locale: z.enum(['en', 'de']).optional().default('en'),
  website: z.string().trim().max(200).optional().default(''),
})

export type ContactForm = z.input<typeof contactSchema>
export type ContactPayload = z.output<typeof contactSchema>

const TOPIC_LABELS: Record<ContactTopic, { en: string; de: string }> = {
  website: { en: 'Website', de: 'Website' },
  app: { en: 'App', de: 'App' },
  self_engine: { en: 'Self-Engine', de: 'Self-Engine' },
  other: { en: 'Other', de: 'Sonstiges' },
}

export function formatContactTopic(payload: ContactPayload) {
  if (!payload.topic) {
    return ''
  }

  const labels = TOPIC_LABELS[payload.topic]
  return payload.locale === 'de' ? labels.de : labels.en
}

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
  return value
    .replace(/[\r\n]+/g, ' ')
    .trim()
    .slice(0, contactLimits.nameMax)
}
