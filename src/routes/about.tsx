import { createFileRoute, redirect } from '@tanstack/react-router'

// The about content now lives on the home one-pager; keep old links working.
export const Route = createFileRoute('/about')({
  beforeLoad: () => {
    throw redirect({ to: '/', hash: 'about', statusCode: 301 })
  },
})
