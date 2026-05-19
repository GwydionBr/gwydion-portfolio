import { useEffect, useState } from 'react'
import { Anchor, List, Paper, Text } from '@mantine/core'

interface TocItem {
  id: string
  title: string
}

interface PrivacyTableOfContentsProps {
  heading: string
  items: TocItem[]
}

/** Sticky in-page navigation for the privacy policy. */
export function PrivacyTableOfContents({ heading, items }: PrivacyTableOfContentsProps) {
  const [activeId, setActiveId] = useState(items[0]?.id ?? '')

  useEffect(() => {
    if (typeof window === 'undefined' || items.length === 0) return

    const getHashId = () => window.location.hash.replace(/^#/, '')
    const initialHashId = getHashId()

    if (initialHashId && items.some((item) => item.id === initialHashId)) {
      setActiveId(initialHashId)
    } else {
      setActiveId(items[0]?.id ?? '')
    }

    const sections = items
      .map((item) => document.getElementById(item.id))
      .filter((section): section is HTMLElement => section !== null)

    if (sections.length === 0) return

    const visibleSections = new Map<string, number>()

    const updateActiveSection = () => {
      if (visibleSections.size > 0) {
        const [nextActiveId] = [...visibleSections.entries()].sort((a, b) => Math.abs(a[1]) - Math.abs(b[1]))[0]
        setActiveId(nextActiveId)
        return
      }

      const scrollOffset = 120
      const passedSections = sections.filter((section) => section.getBoundingClientRect().top <= scrollOffset)
      setActiveId(passedSections.at(-1)?.id ?? sections[0].id)
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            visibleSections.set(entry.target.id, entry.boundingClientRect.top)
          } else {
            visibleSections.delete(entry.target.id)
          }
        }

        updateActiveSection()
      },
      {
        rootMargin: '-96px 0px -55% 0px',
        threshold: [0, 0.1, 0.25, 0.5, 0.75, 1],
      },
    )

    for (const section of sections) {
      observer.observe(section)
    }

    const handleHashChange = () => {
      const hashId = getHashId()
      if (hashId && items.some((item) => item.id === hashId)) {
        setActiveId(hashId)
      }
    }

    window.addEventListener('hashchange', handleHashChange)
    updateActiveSection()

    return () => {
      observer.disconnect()
      window.removeEventListener('hashchange', handleHashChange)
    }
  }, [items])

  return (
    <Paper
      component="nav"
      aria-label={heading}
      p="lg"
      radius="lg"
      withBorder
      style={{
        position: 'sticky',
        top: 96,
      }}
    >
      <Text
        ff="var(--mantine-font-family-monospace)"
        fz="0.68rem"
        c="var(--app-text-muted)"
        style={{ letterSpacing: '0.18em', textTransform: 'uppercase', marginBottom: 14, display: 'block' }}
      >
        {heading}
      </Text>
      <List type="ordered" spacing={8} c="var(--app-text-secondary)" size="sm">
        {items.map((item) => (
          <List.Item key={item.id}>
            <Anchor
              href={`#${item.id}`}
              size="sm"
              c={activeId === item.id ? 'var(--app-text-primary)' : 'var(--app-text-secondary)'}
              underline="hover"
              aria-current={activeId === item.id ? 'location' : undefined}
              data-active={activeId === item.id ? 'true' : undefined}
              onClick={() => setActiveId(item.id)}
              className="privacy-toc-link"
              style={{ lineHeight: 1.45 }}
            >
              {item.title}
            </Anchor>
          </List.Item>
        ))}
      </List>
    </Paper>
  )
}
