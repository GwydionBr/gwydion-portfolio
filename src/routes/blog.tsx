import { createFileRoute, redirect } from '@tanstack/react-router'
import { BlogPageContent } from '#/features/blog/components/BlogPageContent'
import { BLOG_ENABLED } from '#/shared/config/features'
import * as m from '#/generated/paraglide/messages'
import { buildRouteHead } from '#/shared/seo/buildRouteHead'

export const Route = createFileRoute('/blog')({
  head: () => buildRouteHead({ path: '/blog', title: m.meta_blog_title(), description: m.meta_blog_description() }),
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
