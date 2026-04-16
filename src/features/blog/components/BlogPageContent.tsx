import * as m from '#/generated/paraglide/messages'
import { Reveal } from '#/shared/motion'
import { BlogCard } from './BlogCard'
import { BlogPageShell } from './BlogPageShell'

const TOPICS = [
  'Building in public',
  'Productivity systems',
  'Open source',
  'Buddhist philosophy',
  'TypeScript',
  'Self-Engine dev log',
  'Mindfulness & tech',
]

export function BlogPageContent() {
  return (
    <BlogPageShell eyebrow={m.blog_heading()} title={m.blog_sub()}>
      <Reveal delay={0.25}>
        <BlogCard
          title={m.blog_card_title()}
          description={m.blog_card_desc()}
          topics={TOPICS}
          href="https://github.com/gwydion"
          linkLabel={m.blog_follow()}
        />
      </Reveal>
    </BlogPageShell>
  )
}
