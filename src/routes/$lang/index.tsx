import { useId } from 'react'
import { createFileRoute, Link } from '@tanstack/react-router'
import { useLingui } from '@lingui/react/macro'
import { CvDownload } from '#/components/CvDownload'
import { PostList } from '#/components/PostList'
import { ProjectCards } from '#/components/ProjectCards'
import { SkillList } from '#/components/SkillList'
import { Tile } from '#/components/Tile'
import { useHasWriting, usePosts, useProfile, useProjects } from '#/content/react'
import { useSiteLanguage } from '#/i18n/react'
import { pageHead } from '#/seo/pageHead'
import { ContactAction, View } from '#/shell/View'

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
 * The Overview: a hero with Gwydion's name, pitch, CV and Availability, then
 * the featured Projects as cards, then skills, "Now" and the latest Posts.
 */
function Overview() {
  const { t } = useLingui()
  const { name, now } = useProfile()
  const featured = useProjects({ featured: true })
  const posts = usePosts()
  const hasWriting = useHasWriting()
  const featuredId = useId()
  return (
    <View title={name} location={[]} hero={<Hero />}>
      {featured.length > 0 && (
        <section aria-labelledby={featuredId} className="mb-4">
          <div className="mb-3 flex items-baseline justify-between gap-3 px-1">
            <h2 id={featuredId} className="text-xs font-medium text-subtle">
              {t`Featured Projects`}
            </h2>
            <ViewAllLink to="/$lang/projects" />
          </div>
          <ProjectCards projects={featured} />
        </section>
      )}
      <div className="grid items-start gap-4 lg:grid-cols-2">
        <Tile title={t`Skills`}>
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
        {hasWriting && (
          <Tile title={t`Latest Posts`} action={<ViewAllLink to="/$lang/writing" />}>
            <PostList posts={posts.slice(0, LATEST_POSTS)} />
          </Tile>
        )}
      </div>
    </View>
  )
}

/**
 * Under Gwydion's name: role and location, the pitch, the CV and "Get in
 * touch", and the Availability. Phones see the Availability only here; the
 * sidebar shows it on desktop.
 */
function Hero() {
  const { t } = useLingui()
  const { role, location, pitch, availability } = useProfile()
  return (
    <>
      <p className="mt-1 text-base text-muted">
        {role} · {location}
      </p>
      <p className="mt-5 text-lg leading-relaxed text-ink sm:text-xl">{pitch}</p>
      <div className="mt-6 flex flex-wrap items-center gap-3">
        <CvDownload look="primary" />
        <ContactAction look="secondary" />
      </div>
      <section
        aria-label={t`Availability`}
        className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-1"
      >
        <p className="inline-flex items-center gap-2 rounded-full bg-available-surface px-3 py-1 font-medium text-available ring-1 ring-available-line">
          <span aria-hidden className="size-1.5 shrink-0 rounded-full bg-available" />
          {availability.headline}
        </p>
        {availability.freelance && <p className="text-subtle">{availability.freelance}</p>}
      </section>
    </>
  )
}

/** A "View all" link to the full list a section previews. */
function ViewAllLink({ to }: { to: '/$lang/projects' | '/$lang/writing' }) {
  const { t } = useLingui()
  const lang = useSiteLanguage()
  return (
    <Link to={to} params={{ lang }} className="text-xs text-subtle hover:text-ink">
      {t`View all`}
    </Link>
  )
}
