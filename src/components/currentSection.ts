import { useCallback, useEffect, useRef, useState } from 'react'
import { useLocation } from '@tanstack/react-router'

/**
 * Which section a reader is in, by where its headings stand: the last one
 * whose heading has passed `line` (its top above it), or the last one once
 * the page is scrolled to its end, where a short last section never reaches
 * the line. -1 before the first heading has passed it.
 */
export function currentSectionIndex(
  headingTops: readonly number[],
  line: number,
  atEnd: boolean,
): number {
  if (atEnd) return headingTops.length - 1
  let passed = -1
  headingTops.forEach((top, index) => {
    if (top <= line) passed = index
  })
  return passed
}

/** How far down the window a heading has to rise for its section to count as read: a third. */
const READING_LINE = 1 / 3

/** What a reader does to scroll by themselves; a jump's own scrolling causes none of these. */
const OWN_SCROLLING = ['wheel', 'touchmove', 'keydown', 'pointerdown'] as const

/**
 * The id of the section (of `ids`, the ids of their headings, in order) the
 * reader is in; null before the first one, and always on the server, which
 * can't know. It follows the window's scroll, except after a jump: the
 * section jumped to (named by the address's hash, or by `jumpedTo`) stays the
 * current one until the reader scrolls by themselves, wherever its heading
 * came to rest. Near the page's end it can't rise to the top, and a short
 * section before it leaves the next heading above the reading line.
 */
export function useCurrentSection(
  ids: readonly string[],
): readonly [current: string | null, jumpedTo: (id: string) => void] {
  const [current, setCurrent] = useState<string | null>(null)
  const jumped = useRef<string | null>(null)
  const hash = useLocation({ select: (location) => location.hash })
  const key = ids.join(' ')
  useEffect(() => {
    const sectionIds = key.split(' ')
    const headings = sectionIds
      .map((id) => document.getElementById(id))
      .filter((heading) => heading !== null)
    jumped.current = sectionIds.includes(hash) ? hash : null
    let frame = 0
    const update = () => {
      frame = 0
      if (jumped.current) return setCurrent(jumped.current)
      const root = document.documentElement
      const index = currentSectionIndex(
        headings.map((heading) => heading.getBoundingClientRect().top),
        window.innerHeight * READING_LINE,
        window.scrollY > 0 && window.innerHeight + window.scrollY >= root.scrollHeight - 2,
      )
      setCurrent(headings[index]?.id ?? null)
    }
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }
    // Only lets go of the jump; the mark moves once the page does.
    const release = () => {
      jumped.current = null
    }
    update()
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule)
    for (const type of OWN_SCROLLING) window.addEventListener(type, release, { passive: true })
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', schedule)
      for (const type of OWN_SCROLLING) window.removeEventListener(type, release)
    }
  }, [key, hash])
  const jumpedTo = useCallback((id: string) => {
    jumped.current = id
    setCurrent(id)
  }, [])
  return [current, jumpedTo]
}
