import { createFileRoute } from '@tanstack/react-router'
import { Alert, Anchor, Button, Group, SimpleGrid, Stack, Text, TextInput, Textarea, ThemeIcon } from '@mantine/core'
import { motion } from 'motion/react'
import { PaperPlaneTiltIcon, ArrowUpRightIcon } from '@phosphor-icons/react'
import { useState } from 'react'
import { useForm } from '@mantine/form'
import { AccentRule, AppCard, DisplayTitle, Eyebrow, PageContainer, PageMain } from '../components/ui/Page'
import * as m from '../paraglide/messages'
import { contactLimits, contactSchema, type ContactForm } from '../lib/contact'

export const Route = createFileRoute('/contact')({ component: ContactPage })

type Status = 'idle' | 'sending' | 'success' | 'error'

function ContactPage() {
  const [status, setStatus] = useState<Status>('idle')

  const form = useForm<ContactForm>({
    initialValues: { name: '', email: '', message: '', website: '' },
    validate: validateContactForm,
  })

  const handleSubmit = async (values: ContactForm) => {
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
    <PageMain>
      <PageContainer>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <Eyebrow mb={16}>{m.contact_heading()}</Eyebrow>
          <DisplayTitle>
            {m.contact_heading()}
            <span style={{ color: 'var(--app-accent-gold)' }}>.</span>
          </DisplayTitle>
        </motion.div>

        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          style={{ transformOrigin: 'left' }}
        >
          <AccentRule my={40} />
        </motion.div>

        <SimpleGrid cols={{ base: 1, md: 2 }} spacing={80} verticalSpacing={60}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <Text size="lg" lh={1.75} c="var(--app-text-secondary)" mb={40}>
              {m.contact_sub()}
            </Text>

            <Stack gap="md">
              {CONTACT_ITEMS.map(({ label, value, href }) => (
                <Stack key={label} gap={6}>
                  <Eyebrow>{label}</Eyebrow>
                  {href ? (
                    <Anchor href={href} target="_blank" rel="noopener noreferrer" c="var(--app-text-primary)" underline="never">
                      <Group component="span" gap={5}>
                        {value} <ArrowUpRightIcon size={13} />
                      </Group>
                    </Anchor>
                  ) : (
                    <Text size="sm" c="var(--app-text-primary)">
                      {value}
                    </Text>
                  )}
                </Stack>
              ))}
            </Stack>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
          >
            {status === 'success' ? (
              <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }}>
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
            )}
          </motion.div>
        </SimpleGrid>
      </PageContainer>
    </PageMain>
  )
}

function validateContactForm(values: ContactForm) {
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
      errors[field] = issue.code === 'too_big'
        ? m.contact_error_message_long({ max: contactLimits.messageMax })
        : m.contact_error_message_short({ min: contactLimits.messageMin })
    }

    return errors
  }, {})
}

const CONTACT_ITEMS = [
  { label: 'Email', value: 'hello@gwydion.dev', href: 'mailto:hello@gwydion.dev' },
  { label: 'GitHub', value: 'github.com/gwydion', href: 'https://github.com/gwydion' },
  { label: 'Project', value: 'Self-Engine', href: 'https://self-engine.app' },
]
