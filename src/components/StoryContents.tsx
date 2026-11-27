import type { MouseEvent } from 'react'
import { NavLink, Stack } from '@mantine/core'
import { useLingui } from '@lingui/react/macro'
import { useNavigate } from '@tanstack/react-router'
import type { StorySection } from '#/content'
import { useCurrentSection } from './currentSection'
import classes from './StoryContents.module.css'
import { Tile } from './Tile'

/** Whether a click is a plain one, which the page may handle; others open a tab or a window. */
const isPlainClick = (event: MouseEvent) =>
  event.button === 0 && !event.metaKey && !event.ctrlKey && !event.shiftKey && !event.altKey

/**
 * "On this page": the sections of a Project's story as links to their
 * headings, the section being read marked (`aria-current="location"`). The
 * links are plain in-page links, so they work before the page is interactive
 * and their address can be shared; once it is, a jump glides (unless the
 * visitor asks for less motion) and moves the focus to the heading.
 */
export function StoryContents({ sections }: { sections: readonly StorySection[] }) {
  const { t } = useLingui()
  const navigate = useNavigate()
  const [current, jumpedTo] = useCurrentSection(sections.map((section) => section.id))

  const jump = (event: MouseEvent, id: string) => {
    const heading = document.getElementById(id)
    if (!heading || !isPlainClick(event)) return
    event.preventDefault()
    const smooth = !window.matchMedia('(prefers-reduced-motion: reduce)').matches
    void navigate({
      to: '.',
      hash: id,
      resetScroll: false,
      hashScrollIntoView: { behavior: smooth ? 'smooth' : 'instant', block: 'start' },
    })
    heading.focus({ preventScroll: true })
    jumpedTo(id)
  }

  return (
    <Tile title={t`On this page`} landmark="nav" density="snug">
      <Stack component="ul" role="list" gap={0} m={0} mt={8} p={0} style={{ listStyle: 'none' }}>
        {sections.map(({ id, title }) => (
          <li key={id}>
            <NavLink
              href={`#${id}`}
              label={title}
              active={current === id}
              aria-current={current === id ? 'location' : undefined}
              onClick={(event) => jump(event, id)}
              classNames={{ body: classes.body }}
            />
          </li>
        ))}
      </Stack>
    </Tile>
  )
}
