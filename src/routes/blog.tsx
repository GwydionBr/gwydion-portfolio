import { createFileRoute } from '@tanstack/react-router'
import { Anchor, Badge, Box, Group, Stack, Text, ThemeIcon } from '@mantine/core'
import { motion } from 'motion/react'
import { PencilSimpleLineIcon, ArrowUpRightIcon } from '@phosphor-icons/react'
import { AccentRule, AppCard, DisplayTitle, Eyebrow, PageContainer, PageMain } from '../components/ui/Page'
import * as m from '../paraglide/messages'

export const Route = createFileRoute('/blog')({ component: BlogPage })

function BlogPage() {
  return (
    <PageMain>
      <PageContainer>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <Eyebrow mb={16}>{m.blog_heading()}</Eyebrow>
          <DisplayTitle>{m.blog_sub()}</DisplayTitle>
        </motion.div>

        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          style={{ transformOrigin: 'left' }}
        >
          <AccentRule my={40} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
        >
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
                {m.blog_card_title()}
              </DisplayTitle>

              <Text lh={1.75} c="var(--app-text-secondary)" mb={32}>
                {m.blog_card_desc()}
              </Text>

              <Group gap={8} mb={36}>
                {TOPICS.map((topic) => (
                  <Badge key={topic} variant="default">
                    {topic}
                  </Badge>
                ))}
              </Group>

              <Anchor href="https://github.com/gwydion" target="_blank" rel="noopener noreferrer" size="sm">
                <Group component="span" gap={6}>
                  {m.blog_follow()} <ArrowUpRightIcon size={13} />
                </Group>
              </Anchor>
            </Stack>
          </AppCard>
        </motion.div>
      </PageContainer>
    </PageMain>
  )
}

const TOPICS = [
  'Building in public',
  'Productivity systems',
  'Open source',
  'Buddhist philosophy',
  'TypeScript',
  'Self-Engine dev log',
  'Mindfulness & tech',
]
