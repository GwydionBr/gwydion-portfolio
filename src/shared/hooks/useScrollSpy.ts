import { useEffect, useState } from 'react'

/**
 * Returns the id of the element currently crossing a thin band near the top third of the
 * viewport. Used to highlight the matching entry in an in-page navigation.
 */
export function useScrollSpy(ids: readonly string[]) {
  const [activeId, setActiveId] = useState(ids[0])
  const idsKey = ids.join('|')

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.find((entry) => entry.isIntersecting)
        if (visible) {
          setActiveId(visible.target.id)
        }
      },
      { rootMargin: '-35% 0px -60% 0px' },
    )

    for (const id of idsKey.split('|')) {
      const element = document.getElementById(id)
      if (element) {
        observer.observe(element)
      }
    }

    return () => observer.disconnect()
  }, [idsKey])

  return activeId
}
