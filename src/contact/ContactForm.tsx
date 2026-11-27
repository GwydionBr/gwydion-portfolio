import { useId, useRef, useState, type FormEvent } from 'react'
import { Trans, useLingui } from '@lingui/react/macro'
import { Alert, Box, Button, Text, Textarea, TextInput, UnstyledButton } from '@mantine/core'
import { RouterAnchor } from '#/components/links'
import { trackEvent } from '#/analytics/umami'
import { EmailLink } from '#/components/ProfileLinks'
import { PRIVACY_PAGE } from '#/legal/pages'
import { useSiteLanguage } from '#/i18n/react'
import type { ContactResponse } from './endpoint'
import {
  CONTACT_LIMITS,
  validateContactMessage,
  type ContactField,
  type ContactFieldErrors,
} from './message'
import classes from './ContactForm.module.css'

type Status = 'editing' | 'sending' | 'sent' | 'failed'

const EMPTY = { name: '', email: '', message: '', website: '' }

/**
 * The contact form: name, email, message and the honeypot. It validates in the
 * browser first, so invalid input never leaves it, then posts to
 * `/api/contact` in the Site language, which validates again.
 */
export function ContactForm() {
  const { t, i18n } = useLingui()
  const language = useSiteLanguage()
  const id = useId()
  const formRef = useRef<HTMLFormElement>(null)
  const [values, setValues] = useState(EMPTY)
  const [fieldErrors, setFieldErrors] = useState<ContactFieldErrors>({})
  const [status, setStatus] = useState<Status>('editing')

  if (status === 'sent') {
    return (
      <Box role="status" mt={8}>
        <Text size="md" lh={1.5} fw={500} c="var(--ink)">
          {t`Message sent. I'll get back to you.`}
        </Text>
        <UnstyledButton
          type="button"
          mt={12}
          fw={500}
          c="var(--muted)"
          td="underline"
          onClick={() => {
            setValues(EMPTY)
            setStatus('editing')
          }}
        >
          {t`Write another message`}
        </UnstyledButton>
      </Box>
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
        trackEvent({ name: 'kontaktformular-gesendet' })
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
    error: fieldErrors[name],
    'aria-errormessage': fieldErrors[name] ? `${id}-${name}-error` : undefined,
  })

  return (
    <Box
      component="form"
      ref={formRef}
      noValidate
      onSubmit={submit}
      pos="relative"
      mt={12}
      display="flex"
      style={{ flexDirection: 'column', gap: 'var(--mantine-spacing-md)' }}
    >
      <TextInput label={t`Name`} type="text" autoComplete="name" {...field('name')} />
      <TextInput label={t`Email`} type="email" autoComplete="email" {...field('email')} />
      <Textarea
        label={t`Message`}
        rows={6}
        maxLength={CONTACT_LIMITS.messageMax}
        {...field('message')}
      />
      {/* The honeypot: off screen and out of the tab order; only bots fill it in. */}
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        value={values.website}
        onChange={(event) => setValues((current) => ({ ...current, website: event.target.value }))}
        className={classes.honeypot}
      />
      {status === 'failed' && (
        <Alert color="danger" p="sm">
          {t`Your message could not be sent. Please try again, or write to me directly:`}{' '}
          <EmailLink />
        </Alert>
      )}
      <Button type="submit" disabled={status === 'sending'} style={{ alignSelf: 'flex-start' }}>
        {status === 'sending' ? t`Sending…` : t`Send message`}
      </Button>
      <Text size="xs" lh={1.3333}>
        <Trans>
          How I handle your details is explained in the{' '}
          <RouterAnchor to={PRIVACY_PAGE.to} params={{ lang: language }} underline="always" inherit>
            {i18n._(PRIVACY_PAGE.title)}
          </RouterAnchor>
          .
        </Trans>
      </Text>
    </Box>
  )
}
