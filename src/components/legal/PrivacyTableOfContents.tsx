import { Anchor, Paper, Text } from '@mantine/core'

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
  return (
    <Paper
      component="nav"
      aria-label={heading}
      p="lg"
      radius="lg"
      withBorder
      style={{
        borderColor: 'var(--border)',
        background: 'var(--bg-elevated)',
        position: 'sticky',
        top: 96,
      }}
    >
      <Text
        className="mono-label"
        style={{ marginBottom: 14, display: 'block' }}
      >
        {heading}
      </Text>
      <ol
        style={{
          margin: 0,
          paddingLeft: 18,
          display: 'flex',
          flexDirection: 'column',
          gap: 8,
          listStyle: 'decimal',
          color: 'var(--text-secondary)',
          fontSize: '0.875rem',
        }}
      >
        {items.map((item) => (
          <li key={item.id} style={{ paddingLeft: 4 }}>
            <Anchor
              href={`#${item.id}`}
              size="sm"
              c="var(--text-secondary)"
              underline="hover"
              style={{ lineHeight: 1.45 }}
            >
              {item.title}
            </Anchor>
          </li>
        ))}
      </ol>
    </Paper>
  )
}
