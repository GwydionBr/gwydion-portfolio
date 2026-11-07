import { useId, useRef, useState, type FormEvent, type ReactNode } from 'react'
import { useLingui } from '@lingui/react/macro'
import { EmailLink } from '#/components/ProfileLinks'
import { useSiteLanguage } from '#/i18n/react'
import type { ContactResponse } from './endpoint'
import {
  CONTACT_LIMITS,
  validateContactMessage,
  type ContactField,
  type ContactFieldErrors,
} from './message'

type Status = 'editing' | 'sending' | 'sent' | 'failed'

const EMPTY = { name: '', email: '', message: '', website: '' }

/**
 * The contact form: name, email, message and the honeypot. It validates in the
 * browser first, so invalid input never leaves it, then posts to
 * `/api/contact` in the Site language, which validates again.
 */
export function ContactForm() {
  const { t } = useLingui()
  const language = useSiteLanguage()
  const id = useId()
  const formRef = useRef<HTMLFormElement>(null)
  const [values, setValues] = useState(EMPTY)
  const [fieldErrors, setFieldErrors] = useState<ContactFieldErrors>({})
  const [status, setStatus] = useState<Status>('editing')

  if (status === 'sent') {
    return (
      <div role="status" className="mt-2">
        <p className="text-base font-medium text-ink">{t`Message sent. I'll get back to you.`}</p>
        <button
          type="button"
          className="mt-3 font-medium text-muted underline"
          onClick={() => {
            setValues(EMPTY)
            setStatus('editing')
          }}
        >
          {t`Write another message`}
        </button>
      </div>
    )
  }

  const showErrors = (errors: ContactFieldErrors) => {
    setFieldErrors(errors)
    const first = (['name', 'email', 'message'] as const).find((field) => errors[field])
    if (first) formRef.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus()
  }

  const submit = async (event: FormEvent) => {
    event.preventDefault()
    const validation = validateContactMessage({ ...values, language })
    if (!validation.ok) return showErrors(validation.fieldErrors)

    setFieldErrors({})
    setStatus('sending')
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(validation.message),
      })
      const answer = (await response.json()) as ContactResponse
      if ('ok' in answer) {
        setStatus('sent')
      } else if ('fieldErrors' in answer) {
        showErrors(answer.fieldErrors)
        setStatus('editing')
      } else {
        setStatus('failed')
      }
    } catch {
      setStatus('failed')
    }
  }

  const field = (name: ContactField) => ({
    id: `${id}-${name}`,
    name,
    value: values[name],
    onChange: (event: { target: { value: string } }) =>
      setValues((current) => ({ ...current, [name]: event.target.value })),
    'aria-invalid': fieldErrors[name] ? true : undefined,
    'aria-errormessage': fieldErrors[name] ? `${id}-${name}-error` : undefined,
    className:
      'mt-1 w-full rounded-lg bg-canvas px-3 py-2 text-ink ring-1 ring-line outline-none focus-visible:ring-2 focus-visible:ring-focus aria-invalid:ring-danger',
  })
  const label = (name: ContactField, text: string, control: ReactNode) => (
    <div>
      <label htmlFor={`${id}-${name}`} className="text-xs font-medium text-muted">
        {text}
      </label>
      {control}
      {fieldErrors[name] && (
        <p id={`${id}-${name}-error`} className="mt-1 text-xs text-danger">
          {fieldErrors[name]}
        </p>
      )}
    </div>
  )

  return (
    <form ref={formRef} noValidate onSubmit={submit} className="relative mt-3 space-y-4">
      {label('name', t`Name`, <input type="text" autoComplete="name" {...field('name')} />)}
      {label('email', t`Email`, <input type="email" autoComplete="email" {...field('email')} />)}
      {label(
        'message',
        t`Message`,
        <textarea rows={6} maxLength={CONTACT_LIMITS.messageMax} {...field('message')} />,
      )}
      {/* The honeypot: off screen and out of the tab order; only bots fill it in. */}
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        value={values.website}
        onChange={(event) => setValues((current) => ({ ...current, website: event.target.value }))}
        className="absolute -left-[10000px] size-px opacity-0"
      />
      {status === 'failed' && (
        <p role="alert" className="rounded-lg bg-danger-surface p-3 text-danger">
          {t`Your message could not be sent. Please try again, or write to me directly:`}{' '}
          <EmailLink />
        </p>
      )}
      <button
        type="submit"
        disabled={status === 'sending'}
        className="rounded-lg bg-ink px-4 py-2 font-medium text-canvas hover:opacity-90 disabled:opacity-60"
      >
        {status === 'sending' ? t`Sending…` : t`Send message`}
      </button>
    </form>
  )
}
