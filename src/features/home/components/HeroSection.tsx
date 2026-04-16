import { Link } from '@tanstack/react-router'
import { ArrowRightIcon } from '@phosphor-icons/react'
import { Box, Button, Container, Group, Stack, Text } from '@mantine/core'
import { motion, useReducedMotion } from 'motion/react'
import * as m from '#/generated/paraglide/messages'
import { AnimatedAccentRule, Reveal } from '#/shared/motion'
import { DisplayTitle, Eyebrow } from '#/shared/ui/Page'

export function HeroSection() {
  const reducedMotion = useReducedMotion()

  return (
    <Box
      component="section"
      mih="100vh"
      pt={80}
      px={28}
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        position: 'relative',
      }}
    >
      <Container size={1080} px={0} w="100%">
        <Reveal distance={12} duration={0.6}>
          <Eyebrow>gwydion.dev</Eyebrow>
        </Reveal>

        <Reveal distance={30} duration={0.9} delay={0.1}>
          <DisplayTitle order={1} size="hero" mb={0}>
            {m.hero_tagline()}
          </DisplayTitle>
        </Reveal>

        <AnimatedAccentRule my={32} delay={0.4} />

        <Reveal distance={16} duration={0.7} delay={0.5}>
          <Text maw={480} size="lg" lh={1.7} c="var(--app-text-secondary)">
            {m.hero_sub()}
          </Text>
        </Reveal>

        <Reveal distance={16} duration={0.7} delay={0.65}>
          <Group gap={14} mt={40}>
            <Button component={Link} to="/projects" rightSection={<ArrowRightIcon size={15} weight="bold" />}>
              {m.hero_cta_projects()}
            </Button>
            <Button component={Link} to="/contact" variant="default">
              {m.hero_cta_contact()}
            </Button>
          </Group>
        </Reveal>
      </Container>

      <Reveal
        preset="fade-in"
        duration={1}
        delay={1.4}
        style={{
          position: 'absolute',
          bottom: 40,
          left: '50%',
          transform: 'translateX(-50%)',
        }}
      >
        <Stack align="center" gap={8}>
          <Text
            component="span"
            ff="var(--mantine-font-family-monospace)"
            fz="0.6rem"
            c="var(--app-text-muted)"
            style={{ letterSpacing: '0.18em', textTransform: 'uppercase' }}
          >
            scroll
          </Text>
          <motion.div
            animate={reducedMotion ? undefined : { y: [0, 6, 0] }}
            transition={reducedMotion ? undefined : { repeat: Infinity, duration: 2, ease: 'easeInOut' }}
            style={{
              width: 1,
              height: 32,
              background: 'linear-gradient(to bottom, var(--app-text-muted), transparent)',
            }}
          />
        </Stack>
      </Reveal>
    </Box>
  )
}
