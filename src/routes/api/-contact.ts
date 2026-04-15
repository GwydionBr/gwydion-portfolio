import { createAPIFileRoute } from '@tanstack/react-start/api'
import { Resend } from 'resend'
import { z } from 'zod'

const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  message: z.string().min(20),
})

export const APIRoute = createAPIFileRoute('/api/contact')({
  POST: async ({ request }) => {
    const body = await request.json()
    const parsed = schema.safeParse(body)

    if (!parsed.success) {
      return new Response(JSON.stringify({ error: 'Invalid input' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      })
    }

    const { name, email, message } = parsed.data
    const apiKey = process.env['RESEND_API_KEY']

    if (!apiKey) {
      console.error('RESEND_API_KEY not set')
      return new Response(JSON.stringify({ error: 'Server configuration error' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      })
    }

    const resend = new Resend(apiKey)

    const { error } = await resend.emails.send({
      from: 'Portfolio Contact <contact@gwydion.dev>',
      to: 'hello@gwydion.dev',
      replyTo: email,
      subject: `New message from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
      html: `
        <div style="font-family:system-ui,sans-serif;max-width:560px;margin:0 auto;color:#101810">
          <h2 style="font-size:1.4rem;margin:0 0 20px">New message from ${name}</h2>
          <table style="width:100%;border-collapse:collapse;margin-bottom:24px">
            <tr>
              <td style="padding:8px 0;color:#3a5244;font-size:0.85rem;width:80px">Name</td>
              <td style="padding:8px 0">${name}</td>
            </tr>
            <tr>
              <td style="padding:8px 0;color:#3a5244;font-size:0.85rem">Email</td>
              <td style="padding:8px 0"><a href="mailto:${email}">${email}</a></td>
            </tr>
          </table>
          <div style="background:#f3efe4;border-radius:10px;padding:20px 24px;white-space:pre-wrap">${message}</div>
          <p style="margin-top:24px;font-size:0.8rem;color:#7a9487">Sent via gwydion.dev</p>
        </div>
      `,
    })

    if (error) {
      console.error('Resend error:', error)
      return new Response(JSON.stringify({ error: 'Failed to send' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      })
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    })
  },
})
