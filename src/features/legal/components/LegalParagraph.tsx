import { Anchor, Text } from '@mantine/core'

const URL_SPLIT = /(https?:\/\/[^\s]+)/g

interface LegalParagraphProps {
  children: string
  /** Last paragraph in a block — no extra bottom margin */
  last?: boolean
}

/** Renders a paragraph and turns bare URLs into external links. */
export function LegalParagraph({ children, last }: LegalParagraphProps) {
  const parts = children.split(URL_SPLIT)

  return (
    <Text
      component="p"
      size="sm"
      c="var(--app-text-secondary)"
      style={{
        lineHeight: 1.78,
        margin: last ? 0 : '0 0 14px',
      }}
    >
      {parts.map((part, i) =>
        /^https?:\/\//.test(part) ? (
          <Anchor
            key={i}
            href={part}
            target="_blank"
            rel="noopener noreferrer"
            size="sm"
            c="var(--app-accent-green)"
            underline="hover"
          >
            {part}
          </Anchor>
        ) : (
          part
        ),
      )}
    </Text>
  )
}
