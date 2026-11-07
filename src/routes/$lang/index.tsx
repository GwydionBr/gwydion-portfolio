import { createFileRoute, Link } from '@tanstack/react-router'
import { useLingui } from '@lingui/react/macro'
import { AvailabilityTile } from '#/components/AvailabilityTile'
import { PostList } from '#/components/PostList'
import { ProjectList } from '#/components/ProjectList'
import { SkillList } from '#/components/SkillList'
import { Tile } from '#/components/Tile'
import { SELF_ENGINE_SLUG } from '#/content'
import { useHasWriting, usePosts, useProfile, useProject, useProjects } from '#/content/react'
import { useSiteLanguage } from '#/i18n/react'
import { pageHead } from '#/seo/pageHead'
import { View } from '#/shell/View'

export const Route = createFileRoute('/$lang/')({
  // Titled and described by the Profile itself.
  head: ({ match }) =>
    pageHead(match, ({ language, content }) => ({
      description: content.getProfile(language).pitch,
    })),
  component: Overview,
})

/** How many Posts the "latest Posts" tile shows. */
const LATEST_POSTS = 3

/**
 * The Overview: tiles summarising the Profile, Self-Engine's numbers, the
 * featured Projects, the Availability and the latest Posts.
 */
function Overview() {
  const { t } = useLingui()
  const { pitch, now } = useProfile()
  const selfEngine = useProject(SELF_ENGINE_SLUG)
  const featured = useProjects({ featured: true })
  const posts = usePosts()
  const hasWriting = useHasWriting()
  return (
    <View title={t`Overview`} location={[]}>
      <div className="grid gap-4 lg:grid-cols-3">
        <Tile title={t`Profile`} className="lg:col-span-2">
          <p className="mt-2 text-base leading-relaxed text-ink">{pitch}</p>
          <SkillList />
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
        {selfEngine?.stats?.map((stat) => (
          <Tile key={stat.label} title={`${selfEngine.title} · ${stat.label}`}>
            <p className="mt-2 text-3xl font-semibold tracking-tight text-ink tabular-nums">
              {stat.value}
            </p>
          </Tile>
        ))}
        {featured.length > 0 && (
          <Tile
            title={t`Featured Projects`}
            className="lg:col-span-2"
            action={<ViewAllLink to="/$lang/projects" />}
          >
            <div className="mt-1">
              <ProjectList projects={featured} label={t`Featured Projects`} headingLevel={3} />
            </div>
          </Tile>
        )}
        <AvailabilityTile />
        {hasWriting && (
          <Tile title={t`Latest Posts`} action={<ViewAllLink to="/$lang/writing" />}>
            <PostList posts={posts.slice(0, LATEST_POSTS)} />
          </Tile>
        )}
      </div>
    </View>
  )
}

/** A tile's "View all" link to the full list it previews. */
function ViewAllLink({ to }: { to: '/$lang/projects' | '/$lang/writing' }) {
  const { t } = useLingui()
  const lang = useSiteLanguage()
  return (
    <Link to={to} params={{ lang }} className="text-xs text-subtle hover:text-ink">
      {t`View all`}
    </Link>
  )
}
