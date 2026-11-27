import { Stack, Text } from '@mantine/core'
import { useLingui } from '@lingui/react/macro'
import type { Post } from '#/content'
import { nativeNameOf } from '#/i18n/language'
import { useSiteLanguage } from '#/i18n/react'

/** Posts with their dates; a Post written in the other language is marked with its Post language. */
export function PostList({ posts }: { posts: readonly Post[] }) {
  const { i18n } = useLingui()
  const siteLanguage = useSiteLanguage()
  return (
    <Stack component="ul" role="list" m={0} mt={8} p={0} gap="sm" style={{ listStyle: 'none' }}>
      {posts.map((post) => (
        <li key={post.slug}>
          <Text inherit lang={post.language} fw={500} c="var(--ink)">
            {post.title}
          </Text>
          <Text size="xs" c="var(--subtle)">
            {post.language !== siteLanguage && `${nativeNameOf(post.language)} · `}
            <time dateTime={post.publishedAt}>
              {i18n.date(post.publishedAt, { dateStyle: 'medium', timeZone: 'UTC' })}
            </time>
          </Text>
        </li>
      ))}
    </Stack>
  )
}
