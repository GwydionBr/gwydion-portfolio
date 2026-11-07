import { createFileRoute } from '@tanstack/react-router'
import { createContactEndpoint } from '#/contact/endpoint'
import { resendMailerFromEnv } from '#/contact/resend'

let endpoint: ReturnType<typeof createContactEndpoint> | undefined

/** `POST /api/contact`: the Contact view's form (`#/contact/endpoint`). */
export const Route = createFileRoute('/api/contact')({
  server: {
    handlers: {
      POST: ({ request }) => {
        // Created on the first request, so the environment is read at run time.
        endpoint ??= createContactEndpoint({ mailer: resendMailerFromEnv() })
        return endpoint(request)
      },
    },
  },
})
