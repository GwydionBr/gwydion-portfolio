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
              c="var(--app-text-secondary)"
              underline="hover"
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
