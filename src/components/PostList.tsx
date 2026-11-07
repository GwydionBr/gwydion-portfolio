import { useLingui } from '@lingui/react/macro'
import type { Post } from '#/content'
import { nativeNameOf } from '#/i18n/language'
import { useSiteLanguage } from '#/i18n/react'

/** Posts with their dates; a Post written in the other language is marked with its Post language. */
export function PostList({ posts }: { posts: readonly Post[] }) {
  const { i18n } = useLingui()
  const siteLanguage = useSiteLanguage()
  return (
    <ul className="mt-2 space-y-3">
      {posts.map((post) => (
        <li key={post.slug}>
          <p lang={post.language} className="font-medium text-ink">
            {post.title}
          </p>
          <p className="text-xs text-subtle">
            {post.language !== siteLanguage && `${nativeNameOf(post.language)} · `}
            <time dateTime={post.publishedAt}>
              {i18n.date(post.publishedAt, { dateStyle: 'medium', timeZone: 'UTC' })}
            </time>
          </p>
        </li>
      ))}
    </ul>
  )
}
