import { useState } from 'react'
import { useForm } from '@mantine/form'
import { PaperPlaneTiltIcon } from '@phosphor-icons/react'
import { Alert, Button, Stack, TextInput, Textarea, ThemeIcon } from '@mantine/core'
import { AnimatePresence, motion } from 'motion/react'
import * as m from '#/generated/paraglide/messages'
import { createRevealTransition, Reveal } from '#/shared/motion'
import { AppCard, DisplayTitle } from '#/shared/ui/Page'
import { contactLimits, contactSchema, type ContactForm as ContactFormValues } from '../model/contact'

type Status = 'idle' | 'sending' | 'success' | 'error'

export function ContactForm() {
  const [status, setStatus] = useState<Status>('idle')

  const form = useForm<ContactFormValues>({
    initialValues: { name: '', email: '', message: '', website: '' },
    validate: validateContactForm,
  })

  const handleSubmit = async (values: ContactFormValues) => {
    setStatus('sending')
    try {
      const payload = contactSchema.parse(values)
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      if (!res.ok) throw new Error('Server error')
      setStatus('success')
      form.reset()
    } catch {
      setStatus('error')
    }
  }

  return (
    <Reveal delay={0.35}>
      <AnimatePresence initial={false} mode="wait">
        {status === 'success' ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={createRevealTransition(0.4)}
          >
            <AppCard p={48} ta="center">
              <ThemeIcon color="forest" size={56} radius="xl" mx="auto" mb={20}>
                <PaperPlaneTiltIcon size={28} weight="thin" />
              </ThemeIcon>
              <DisplayTitle order={3} size="1.8rem" mb={0}>
                {m.contact_success()}
              </DisplayTitle>
            </AppCard>
          </motion.div>
        ) : (
          <motion.div
            key="form"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={createRevealTransition(0.35)}
          >
            <form onSubmit={form.onSubmit(handleSubmit)}>
              <Stack gap="md">
                <TextInput
                  label={m.contact_name()}
                  id="contact-name"
                  type="text"
                  autoComplete="name"
                  placeholder="Gwydion"
                  error={form.errors.name as string}
                  {...form.getInputProps('name')}
                />

                <TextInput
                  label={m.contact_email()}
                  id="contact-email"
                  type="email"
                  autoComplete="email"
                  placeholder="hello@example.com"
                  error={form.errors.email as string}
                  {...form.getInputProps('email')}
                />

                <Textarea
                  label={m.contact_message()}
                  id="contact-message"
                  minRows={6}
                  autosize
                  error={form.errors.message as string}
                  {...form.getInputProps('message')}
                />

                <input
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                  {...form.getInputProps('website')}
                  style={{ position: 'absolute', left: '-10000px', width: 1, height: 1, opacity: 0 }}
                />

                {status === 'error' && (
                  <Alert color="red" variant="light">
                    {m.contact_error()}
                  </Alert>
                )}

                <Button
                  type="submit"
                  loading={status === 'sending'}
                  leftSection={<PaperPlaneTiltIcon size={16} weight="light" />}
                >
                  {status === 'sending' ? m.contact_sending() : m.contact_send()}
                </Button>
              </Stack>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </Reveal>
  )
}

function validateContactForm(values: ContactFormValues) {
  const result = contactSchema.safeParse(values)

  if (result.success) {
    return {}
  }

  return result.error.issues.reduce<Record<string, string>>((errors, issue) => {
    const field = String(issue.path[0] ?? '')
    if (field in errors || field === 'website') {
      return errors
    }

    if (field === 'name') {
      errors[field] = m.contact_error_name()
    } else if (field === 'email') {
      errors[field] = m.contact_error_email()
    } else if (field === 'message') {
      errors[field] =
        issue.code === 'too_big'
          ? m.contact_error_message_long({ max: contactLimits.messageMax })
          : m.contact_error_message_short({ min: contactLimits.messageMin })
    }

    return errors
  }, {})
}
