import { createFileRoute } from '@tanstack/react-router'
import { Button, Group, SimpleGrid, Stack, Text, ThemeIcon } from '@mantine/core'
import { motion } from 'motion/react'
import { LeafIcon, BarbellIcon, CodeIcon, ArrowUpRightIcon } from '@phosphor-icons/react'
import { AccentRule, AppCard, DisplayTitle, Eyebrow, PageContainer, PageMain } from '../components/ui/Page'
import * as m from '../paraglide/messages'

export const Route = createFileRoute('/about')({ component: AboutPage })

function AboutPage() {
  const focusAreas = getFocusAreas()
  const nowItems = getNowItems()

  return (
    <PageMain>
      <PageContainer>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <Eyebrow mb={16}>{m.about_heading()}</Eyebrow>
          <DisplayTitle>
            {m.about_title_a()}<br />
            <em>{m.about_title_b()}</em>
            <br />{m.about_title_c()}
          </DisplayTitle>
        </motion.div>

        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          style={{ transformOrigin: 'left' }}
        >
          <AccentRule my={40} />
        </motion.div>

        <SimpleGrid cols={{ base: 1, md: 2 }} spacing={80} verticalSpacing={60} mb={100}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <Text
              component="p"
              ff="var(--font-display)"
              size="xl"
              lh={1.6}
              c="var(--app-text-primary)"
              mb={28}
            >
              "{m.about_p1()}"
            </Text>
            <Text component="p" size="sm" lh={1.8} c="var(--app-text-secondary)" mb={20}>
              {m.about_p2()}
            </Text>
            <Text component="p" size="sm" lh={1.8} c="var(--app-text-secondary)">
              {m.about_p3()}
            </Text>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
          >
            <Eyebrow mb={24}>{m.about_focus_heading()}</Eyebrow>
            <Stack gap="md">
              {focusAreas.map(({ icon, title, desc }, i) => (
                <motion.div
                  key={title}
                  initial={{ opacity: 0, x: 16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 + i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                >
                  <AppCard p="md">
                    <Group align="flex-start" gap="md" wrap="nowrap">
                      <ThemeIcon color="forest" size={36}>
                        {icon}
                      </ThemeIcon>
                      <Stack gap={4}>
                        <Text size="sm" fw={500} c="var(--app-text-primary)">
                          {title}
                        </Text>
                        <Text size="xs" lh={1.6} c="var(--app-text-muted)">
                          {desc}
                        </Text>
                      </Stack>
                    </Group>
                  </AppCard>
                </motion.div>
              ))}
            </Stack>
          </motion.div>
        </SimpleGrid>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          style={{ marginBottom: 100 }}
        >
          <Eyebrow mb={24}>{m.about_now_heading()}</Eyebrow>
          <SimpleGrid cols={{ base: 1, sm: 2, md: 4 }} spacing={1}>
            {nowItems.map(({ label, value }, i) => (
              <motion.div
                key={label}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.07 }}
              >
                <AppCard p="lg" radius={0} h="100%">
                  <Eyebrow mb={10}>{label}</Eyebrow>
                  <Text size="sm" lh={1.5} c="var(--app-text-primary)">
                    {value}
                  </Text>
                </AppCard>
              </motion.div>
            ))}
          </SimpleGrid>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Group gap={12} pb={40}>
            {LINKS.map(({ label, href }) => (
              <Button
                key={label}
                component="a"
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                variant="default"
                rightSection={<ArrowUpRightIcon size={13} />}
              >
                {label}
              </Button>
            ))}
          </Group>
        </motion.div>
      </PageContainer>
    </PageMain>
  )
}

function getFocusAreas() {
  return [
    {
      icon: <CodeIcon size={18} weight="light" />,
      title: m.about_focus_software_title(),
      desc: m.about_focus_software_desc(),
    },
    {
      icon: <LeafIcon size={18} weight="light" />,
      title: m.about_focus_practice_title(),
      desc: m.about_focus_practice_desc(),
    },
    {
      icon: <BarbellIcon size={18} weight="light" />,
      title: m.about_focus_training_title(),
      desc: m.about_focus_training_desc(),
    },
  ]
}

function getNowItems() {
  return [
    { label: m.about_now_project(), value: m.se_title() },
    { label: m.about_now_learning(), value: m.about_now_learning_value() },
    { label: m.about_now_reading(), value: 'Dhammapada' },
    { label: m.about_now_location(), value: 'Germany' },
  ]
}

const LINKS = [
  { label: 'GitHub', href: 'https://github.com/gwydion' },
  { label: 'Self-Engine', href: 'https://self-engine.app' },
]
