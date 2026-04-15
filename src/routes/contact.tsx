import { createFileRoute } from '@tanstack/react-router'
import { motion } from 'motion/react'
import { PaperPlaneTilt, ArrowUpRight } from '@phosphor-icons/react'
import { useState } from 'react'
import { useForm } from '@mantine/form'
import { z } from 'zod'

export const Route = createFileRoute('/contact')({ component: ContactPage })

const contactSchema = z.object({
  name: z.string().min(2, 'Name is too short'),
  email: z.string().email('Invalid email address'),
  message: z.string().min(20, 'Message is too short (min 20 characters)'),
})

type ContactForm = z.infer<typeof contactSchema>

type Status = 'idle' | 'sending' | 'success' | 'error'

function ContactPage() {
  const [status, setStatus] = useState<Status>('idle')

  const form = useForm<ContactForm>({
    initialValues: { name: '', email: '', message: '' },
    validate: {
      name: (v) => (v.length < 2 ? 'Name is too short' : null),
      email: (v) => (/^\S+@\S+\.\S+$/.test(v) ? null : 'Invalid email address'),
      message: (v) => (v.length < 20 ? 'Message is too short' : null),
    },
  })

  const handleSubmit = async (values: ContactForm) => {
    setStatus('sending')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      })
      if (!res.ok) throw new Error('Server error')
      setStatus('success')
      form.reset()
    } catch {
      setStatus('error')
    }
  }

  return (
    <main style={{ position: 'relative', zIndex: 1, paddingTop: 100 }}>
      <div style={{ maxWidth: 1080, margin: '0 auto', padding: '0 28px' }}>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="mono-label">Contact</span>
          <h1
            className="display"
            style={{
              fontSize: 'clamp(3rem, 7vw, 6rem)',
              lineHeight: 0.96,
              margin: '16px 0 0',
              letterSpacing: '-0.02em',
            }}
          >
            Say <em style={{ fontStyle: 'italic', color: 'var(--accent-green)' }}>hello.</em>
          </h1>
        </motion.div>

        <motion.hr
          className="gold-rule"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          style={{ transformOrigin: 'left', margin: '40px 0 60px' }}
        />

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '60px 80px',
            alignItems: 'start',
          }}
        >
          {/* Left: info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <p style={{ fontSize: '1.05rem', lineHeight: 1.75, color: 'var(--text-secondary)', margin: '0 0 40px' }}>
              Got a project in mind, want to collaborate, or just want to talk
              about productivity systems, open source, or Buddhist philosophy?
              I'm reachable.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {CONTACT_ITEMS.map(({ label, value, href }) => (
                <div key={label}>
                  <div className="mono-label" style={{ marginBottom: 6 }}>{label}</div>
                  {href ? (
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        display: 'inline-flex', alignItems: 'center', gap: 5,
                        fontSize: '0.9rem', color: 'var(--text-primary)',
                        textDecoration: 'none', transition: 'color 0.2s',
                      }}
                    >
                      {value} <ArrowUpRight size={13} />
                    </a>
                  ) : (
                    <span style={{ fontSize: '0.9rem', color: 'var(--text-primary)' }}>{value}</span>
                  )}
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right: form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
          >
            {status === 'success' ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                className="card"
                style={{ padding: '48px 40px', textAlign: 'center' }}
              >
                <PaperPlaneTilt
                  size={40}
                  weight="thin"
                  style={{ color: 'var(--accent-green)', marginBottom: 20 }}
                />
                <h3 className="display" style={{ margin: '0 0 12px', fontSize: '1.8rem' }}>
                  Message sent.
                </h3>
                <p style={{ margin: 0, color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                  I'll be in touch.
                </p>
              </motion.div>
            ) : (
              <form
                onSubmit={form.onSubmit(handleSubmit)}
                style={{ display: 'flex', flexDirection: 'column', gap: 20 }}
              >
                <FormField
                  label="Your name"
                  error={form.errors.name as string}
                >
                  <input
                    type="text"
                    placeholder="Gwydion"
                    {...form.getInputProps('name')}
                    style={inputStyle(!!form.errors.name)}
                  />
                </FormField>

                <FormField
                  label="Your email"
                  error={form.errors.email as string}
                >
                  <input
                    type="email"
                    placeholder="hello@example.com"
                    {...form.getInputProps('email')}
                    style={inputStyle(!!form.errors.email)}
                  />
                </FormField>

                <FormField
                  label="Your message"
                  error={form.errors.message as string}
                >
                  <textarea
                    placeholder="What's on your mind?"
                    rows={6}
                    {...form.getInputProps('message')}
                    style={{ ...inputStyle(!!form.errors.message), resize: 'vertical', minHeight: 140 }}
                  />
                </FormField>

                {status === 'error' && (
                  <p style={{ margin: 0, fontSize: '0.825rem', color: '#e05252' }}>
                    Something went wrong. Please try again.
                  </p>
                )}

                <button
                  type="submit"
                  disabled={status === 'sending'}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 8,
                    padding: '14px 28px',
                    background: status === 'sending' ? 'var(--text-muted)' : 'var(--accent-green)',
                    color: '#fff',
                    border: 'none',
                    borderRadius: 10,
                    fontSize: '0.875rem',
                    fontWeight: 500,
                    letterSpacing: '0.02em',
                    cursor: status === 'sending' ? 'not-allowed' : 'pointer',
                    transition: 'opacity 0.2s, transform 0.2s',
                    fontFamily: 'var(--font-body)',
                  }}
                >
                  <PaperPlaneTilt size={16} weight="light" />
                  {status === 'sending' ? 'Sending…' : 'Send message'}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </main>
  )
}

/* ── Sub-components ──────────────────────────────────────────────────── */
function FormField({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <label style={{ fontSize: '0.78rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
        {label}
      </label>
      {children}
      {error && (
        <span style={{ fontSize: '0.78rem', color: '#e05252' }}>{error}</span>
      )}
    </div>
  )
}

/* ── Helpers ─────────────────────────────────────────────────────────── */
const inputStyle = (hasError: boolean): React.CSSProperties => ({
  width: '100%',
  padding: '12px 16px',
  background: 'var(--bg-elevated)',
  border: `1px solid ${hasError ? '#e05252' : 'var(--border)'}`,
  borderRadius: 10,
  color: 'var(--text-primary)',
  fontSize: '0.9rem',
  fontFamily: 'var(--font-body)',
  outline: 'none',
  transition: 'border-color 0.2s',
})

const CONTACT_ITEMS = [
  { label: 'Email', value: 'hello@gwydion.dev', href: 'mailto:hello@gwydion.dev' },
  { label: 'GitHub', value: 'github.com/gwydion', href: 'https://github.com/gwydion' },
  { label: 'Project', value: 'Self-Engine', href: 'https://self-engine.app' },
]
