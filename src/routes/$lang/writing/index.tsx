import { createFileRoute, notFound } from '@tanstack/react-router'
import { msg } from '@lingui/core/macro'
import { useLingui } from '@lingui/react/macro'
import { PostList } from '#/components/PostList'
import { usePosts } from '#/content/react'
import { pageHead } from '#/seo/pageHead'
import { View } from '#/shell/View'

export const Route = createFileRoute('/$lang/writing/')({
  // No Writing without Posts: an empty blog would look abandoned (spec #31).
  beforeLoad: ({ context }) => {
    if (context.content.getPosts().length === 0) throw notFound()
  },
  head: ({ match }) =>
    pageHead(match, () => ({
      title: msg`Writing`,
      description: msg`Gwydion's Posts on building software.`,
    })),
  component: Writing,
})

/** Every Post, newest first. A placeholder list until Writing is built. */
function Writing() {
  const { t } = useLingui()
  return (
    <View title={t`Writing`}>
      <div className="max-w-2xl rounded-2xl bg-surface p-5 ring-1 ring-line">
        <PostList posts={usePosts()} />
      </div>
    </View>
  )
}
