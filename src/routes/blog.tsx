import { createFileRoute } from '@tanstack/react-router'
import { BlogPageContent } from '#/features/blog/components/BlogPageContent'

export const Route = createFileRoute('/blog')({ component: BlogPage })

function BlogPage() {
  return <BlogPageContent />
}
