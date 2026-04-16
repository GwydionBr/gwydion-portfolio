import { Link } from '@tanstack/react-router'
import { ArrowRightIcon, HeartIcon } from '@phosphor-icons/react'
import { Box, Button, Center, Container, SimpleGrid, Text, ThemeIcon } from '@mantine/core'
import * as m from '#/generated/paraglide/messages'
import { Reveal } from '#/shared/motion'
import { AppCard, DisplayTitle, Eyebrow } from '#/shared/ui/Page'

export function AboutTeaser() {
  return (
    <Box component="section" pt={120} px={28}>
      <Container size={1080} px={0}>
        <SimpleGrid cols={{ base: 1, md: 2 }} spacing={60} verticalSpacing={48}>
          <Reveal trigger="inView" preset="fade-left" distance={24} duration={0.8} viewport={{ margin: '-80px' }}>
            <Eyebrow mb={12}>{m.about_heading()}</Eyebrow>
            <DisplayTitle order={2} size="section" mb={24}>
              {m.home_about_title_a()}
              <br />
              <em>{m.home_about_title_b()}</em>
            </DisplayTitle>
            <Text lh={1.75} c="var(--app-text-secondary)" mb={32}>
              {m.about_p1()}
            </Text>
            <Button component={Link} to="/about" variant="subtle" rightSection={<ArrowRightIcon size={15} weight="bold" />} px={0}>
              {m.about_cta()}
            </Button>
          </Reveal>

          <Reveal
            trigger="inView"
            preset="scale-in"
            duration={0.8}
            delay={0.15}
            viewport={{ margin: '-80px' }}
          >
            <AppCard
              style={{
                aspectRatio: '4/3',
                overflow: 'hidden',
                position: 'relative',
              }}
            >
              <Center h="100%" style={{ position: 'relative' }}>
                {[1, 2, 3, 4].map((n) => (
                  <Box
                    key={n}
                    aria-hidden
                    style={{
                      position: 'absolute',
                      borderRadius: '50%',
                      border: '1px solid var(--app-border)',
                      width: `${n * 22}%`,
                      height: `${n * 22}%`,
                      opacity: 1 - n * 0.15,
                    }}
                  />
                ))}
                <ThemeIcon color="forest" size={56} radius="xl">
                  <HeartIcon size={24} weight="thin" />
                </ThemeIcon>
                <Text
                  component="span"
                  ff="var(--mantine-font-family-monospace)"
                  fz="0.68rem"
                  c="var(--app-text-muted)"
                  style={{
                    letterSpacing: '0.18em',
                    textTransform: 'uppercase',
                    position: 'absolute',
                    bottom: 20,
                    left: '50%',
                    transform: 'translateX(-50%)',
                    whiteSpace: 'nowrap',
                  }}
                >
                  gwydion.dev - {new Date().getFullYear()}
                </Text>
              </Center>
            </AppCard>
          </Reveal>
        </SimpleGrid>
      </Container>
    </Box>
  )
}
