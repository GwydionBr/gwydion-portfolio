import { createFileRoute, Link } from '@tanstack/react-router'
import { useLingui } from '@lingui/react/macro'
import { AvailabilityTile } from '#/components/AvailabilityTile'
import { PostList } from '#/components/PostList'
import { Tile } from '#/components/Tile'
import { usePosts, useProfile } from '#/content/react'
import { useSiteLanguage } from '#/i18n/react'
import { View } from '#/shell/View'

export const Route = createFileRoute('/$lang/')({ component: Overview })

/** How many Posts the "latest Posts" tile shows. */
const LATEST_POSTS = 3

/** The Overview: tiles summarising the Profile, its Availability and the latest Posts. */
function Overview() {
  const { t } = useLingui()
  const lang = useSiteLanguage()
  const { pitch, skills, now } = useProfile()
  const posts = usePosts()
  return (
    <View title={t`Overview`} location={[]}>
      <div className="grid gap-4 lg:grid-cols-3">
        <Tile title={t`Profile`} className="lg:col-span-2">
          <p className="mt-2 text-base leading-relaxed text-ink">{pitch}</p>
          <ul aria-label={t`Skills`} className="mt-4 flex flex-wrap gap-1.5">
            {skills.map((skill) => (
              <li key={skill} className="rounded-md bg-selected px-2 py-0.5 text-xs">
                {skill}
              </li>
            ))}
          </ul>
        </Tile>
        <Tile title={t`Now`}>
          <ul className="mt-2 space-y-2">
            {now.map((item) => (
              <li key={item.label}>
                <span className="font-medium text-ink">{item.label}</span> · {item.text}
              </li>
            ))}
          </ul>
        </Tile>
        <AvailabilityTile />
        {posts.length > 0 && (
          <Tile
            title={t`Latest Posts`}
            action={
              <Link
                to="/$lang/writing"
                params={{ lang }}
                className="text-xs text-subtle hover:text-ink"
              >
                {t`View all`}
              </Link>
            }
          >
            <PostList posts={posts.slice(0, LATEST_POSTS)} />
          </Tile>
        )}
      </div>
    </View>
  )
}
