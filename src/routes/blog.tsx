import { createFileRoute, redirect } from '@tanstack/react-router'
import { BlogPageContent } from '#/features/blog/components/BlogPageContent'
import { BLOG_ENABLED } from '#/shared/config/features'

export const Route = createFileRoute('/blog')({
  beforeLoad: () => {
    if (!BLOG_ENABLED) {
      throw redirect({ to: '/' })
    }
  },
  component: BlogPage,
})

function BlogPage() {
  return <BlogPageContent />
}
