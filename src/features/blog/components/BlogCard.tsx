import { ArrowUpRightIcon, PencilSimpleLineIcon } from '@phosphor-icons/react'
import { Anchor, Badge, Box, Group, Stack, Text, ThemeIcon } from '@mantine/core'
import { AppCard, DisplayTitle } from '#/shared/ui/Page'

interface BlogCardProps {
  title: string
  description: string
  topics: string[]
  href: string
  linkLabel: string
}

export function BlogCard({ title, description, topics, href, linkLabel }: BlogCardProps) {
  return (
    <AppCard p={48} style={{ position: 'relative', overflow: 'hidden' }}>
      <Box
        aria-hidden
        style={{
          position: 'absolute',
          top: -80,
          right: -60,
          width: 280,
          height: 280,
          borderRadius: '50%',
          background: 'radial-gradient(circle, var(--app-accent-green-dim), transparent 65%)',
        }}
      />

      <Stack align="flex-start" gap={0} maw={520} style={{ position: 'relative' }}>
        <ThemeIcon color="forest" size={52} radius="md" mb={24}>
          <PencilSimpleLineIcon size={24} weight="light" />
        </ThemeIcon>

        <DisplayTitle order={2} size="card" mb={16}>
          {title}
        </DisplayTitle>

        <Text lh={1.75} c="var(--app-text-secondary)" mb={32}>
          {description}
        </Text>

        <Group gap={8} mb={36}>
          {topics.map((topic) => (
            <Badge key={topic} variant="default">
              {topic}
            </Badge>
          ))}
        </Group>

        <Anchor href={href} target="_blank" rel="noopener noreferrer" size="sm">
          <Group component="span" gap={6}>
            {linkLabel} <ArrowUpRightIcon size={13} />
          </Group>
        </Anchor>
      </Stack>
    </AppCard>
  )
}
