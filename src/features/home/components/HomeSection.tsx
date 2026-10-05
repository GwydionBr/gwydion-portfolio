import type { ReactNode } from 'react'
import { Reveal } from '#/shared/motion'
import { HOME_SECTION_LABELS, type HomeSectionId } from '../content/sections'

interface HomeSectionProps {
  id: HomeSectionId
  children: ReactNode
}

export function HomeSection({ id, children }: HomeSectionProps) {
  const headingId = `${id}-heading`

  return (
    <section id={id} className="home-section" aria-labelledby={headingId}>
      <Reveal trigger="inView" distance={20} viewport={{ margin: '-80px' }}>
        <h2 id={headingId} className="home-section-heading">
          {HOME_SECTION_LABELS[id]()}
        </h2>
        {children}
      </Reveal>
    </section>
  )
}
