import { ArrowUpRightIcon, BarbellIcon, CodeIcon, HeartIcon } from '@phosphor-icons/react'
import { Anchor, Box, Container, SimpleGrid, Stack, Text, ThemeIcon } from '@mantine/core'
import * as m from '#/generated/paraglide/messages'
import { SELF_ENGINE_URL } from '#/shared/config/links'
import { Reveal, StaggerGroup, StaggerItem } from '#/shared/motion'
import { AppCard, DisplayTitle, Eyebrow } from '#/shared/ui/Page'

export function CurrentlySection() {
  const items = [
    {
      icon: <CodeIcon size={20} weight="light" />,
      label: m.currently_building(),
      text: m.currently_building_desc(),
      href: SELF_ENGINE_URL,
    },
    {
      icon: <HeartIcon size={20} weight="light" />,
      label: m.currently_learning(),
      text: m.currently_learning_desc(),
    },
    {
      icon: <BarbellIcon size={20} weight="light" />,
      label: m.currently_moving(),
      text: m.currently_moving_desc(),
    },
  ]

  return (
    <Box component="section" pt={120} px={28}>
      <Container size={1080} px={0}>
        <Reveal trigger="inView" viewport={{ margin: '-80px' }} duration={0.7}>
          <Eyebrow mb={12}>{m.currently_heading()}</Eyebrow>
          <DisplayTitle order={2} size="section" mb={48}>
            {m.home_focus_heading()}
          </DisplayTitle>
        </Reveal>

        <StaggerGroup trigger="inView" stagger={0.1}>
          <SimpleGrid cols={{ base: 1, sm: 3 }} spacing="md">
            {items.map(({ icon, label, text, href }) => (
              <StaggerItem key={label} duration={0.6}>
                <AppCard p="xl" h="100%">
                  <Stack gap="sm">
                    <ThemeIcon color="forest" size={40}>
                      {icon}
                    </ThemeIcon>
                    <Eyebrow>{label}</Eyebrow>
                    <Text size="sm" lh={1.65} c="var(--app-text-secondary)">
                      {text}
                    </Text>
                    {href && (
                      <Anchor href={href} target="_blank" rel="noopener noreferrer" c="var(--app-accent-green)" underline="never">
                        {m.self_visit_site()} <ArrowUpRightIcon size={13} style={{ verticalAlign: 'text-top' }} />
                      </Anchor>
                    )}
                  </Stack>
                </AppCard>
              </StaggerItem>
            ))}
          </SimpleGrid>
        </StaggerGroup>
      </Container>
    </Box>
  )
}
