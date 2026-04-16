import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Badge,
  Box,
  Button,
  Center,
  Container,
  Group,
  SimpleGrid,
  Stack,
  Text,
  ThemeIcon,
} from "@mantine/core";
import {
  ArrowRightIcon,
  TimerIcon,
  CurrencyCircleDollarIcon,
  CalendarDotsIcon,
  BarbellIcon,
  LeafIcon,
  CodeIcon,
} from "@phosphor-icons/react";
import { motion, useReducedMotion } from "motion/react";
import { AnimatedAccentRule, Reveal, StaggerGroup, StaggerItem } from "../components/motion";
import { AppCard, DisplayTitle, Eyebrow, PageMain } from "../components/ui/Page";
import * as m from "../paraglide/messages";

export const Route = createFileRoute("/")({ component: HomePage });

function HomePage() {
  return (
    <PageMain pt={0}>
      <HeroSection />
      <CurrentlySection />
      <FeaturedProjectSection />
      <AboutTeaser />
    </PageMain>
  );
}

function HeroSection() {
  const reducedMotion = useReducedMotion();

  return (
    <Box
      component="section"
      mih="100vh"
      pt={80}
      px={28}
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        position: "relative",
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
          position: "absolute",
          bottom: 40,
          left: "50%",
          transform: "translateX(-50%)",
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
            transition={reducedMotion ? undefined : { repeat: Infinity, duration: 2, ease: "easeInOut" }}
            style={{
              width: 1,
              height: 32,
              background: "linear-gradient(to bottom, var(--app-text-muted), transparent)",
            }}
          />
        </Stack>
      </Reveal>
    </Box>
  );
}

function CurrentlySection() {
  const items = [
    {
      icon: <CodeIcon size={20} weight="light" />,
      label: m.currently_building(),
      text: m.currently_building_desc(),
    },
    {
      icon: <LeafIcon size={20} weight="light" />,
      label: m.currently_learning(),
      text: m.currently_learning_desc(),
    },
    {
      icon: <BarbellIcon size={20} weight="light" />,
      label: m.currently_moving(),
      text: m.currently_moving_desc(),
    },
  ];

  return (
    <Box component="section" pt={120} px={28}>
      <Container size={1080} px={0}>
        <Reveal trigger="inView" viewport={{ margin: "-80px" }} duration={0.7}>
          <Eyebrow mb={12}>{m.currently_heading()}</Eyebrow>
          <DisplayTitle order={2} size="section" mb={48}>
            {m.home_focus_heading()}
          </DisplayTitle>
        </Reveal>

        <StaggerGroup trigger="inView" stagger={0.1}>
          <SimpleGrid cols={{ base: 1, sm: 3 }} spacing="md">
            {items.map(({ icon, label, text }) => (
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
                  </Stack>
                </AppCard>
              </StaggerItem>
            ))}
          </SimpleGrid>
        </StaggerGroup>
      </Container>
    </Box>
  );
}

function FeaturedProjectSection() {
  return (
    <Box component="section" pt={120} px={28}>
      <Container size={1080} px={0}>
        <Reveal trigger="inView" viewport={{ margin: "-80px" }} duration={0.7}>
          <Eyebrow>{m.projects_heading()}</Eyebrow>
        </Reveal>

        <Reveal trigger="inView" distance={28} duration={0.8} delay={0.1}>
          <AppCard mt={20} p={48} style={{ position: "relative", overflow: "hidden" }}>
            <Box
              aria-hidden
              style={{
                position: "absolute",
                top: -80,
                right: -80,
                width: 320,
                height: 320,
                borderRadius: "50%",
                background: "radial-gradient(circle, var(--app-accent-green-dim), transparent 70%)",
                pointerEvents: "none",
              }}
            />

            <Stack align="flex-start" gap={0} style={{ position: "relative" }}>
              <StatusBadge>{m.se_status()}</StatusBadge>
              <DisplayTitle order={3} size="clamp(2rem, 4vw, 3rem)" mb={16}>
                {m.se_title()}
              </DisplayTitle>
              <Text maw={520} lh={1.7} c="var(--app-text-secondary)" mb={32}>
                {m.se_desc()}
              </Text>

              <ProjectTags mb={36} />

              <Button
                component={Link}
                to="/projects"
                variant="subtle"
                rightSection={<ArrowRightIcon size={15} weight="bold" />}
                px={0}
              >
                {m.se_cta()}
              </Button>
            </Stack>
          </AppCard>
        </Reveal>
      </Container>
    </Box>
  );
}

function AboutTeaser() {
  return (
    <Box component="section" pt={120} px={28}>
      <Container size={1080} px={0}>
        <SimpleGrid cols={{ base: 1, md: 2 }} spacing={60} verticalSpacing={48}>
          <Reveal trigger="inView" preset="fade-left" distance={24} duration={0.8} viewport={{ margin: "-80px" }}>
            <Eyebrow mb={12}>{m.about_heading()}</Eyebrow>
            <DisplayTitle order={2} size="section" mb={24}>
              {m.home_about_title_a()}
              <br />
              <em>{m.home_about_title_b()}</em>
            </DisplayTitle>
            <Text lh={1.75} c="var(--app-text-secondary)" mb={32}>
              {m.about_p1()}
            </Text>
            <Button
              component={Link}
              to="/about"
              variant="subtle"
              rightSection={<ArrowRightIcon size={15} weight="bold" />}
              px={0}
            >
              {m.about_cta()}
            </Button>
          </Reveal>

          <Reveal
            trigger="inView"
            preset="scale-in"
            duration={0.8}
            delay={0.15}
            viewport={{ margin: "-80px" }}
          >
            <AppCard
              style={{
                aspectRatio: "4/3",
                overflow: "hidden",
                position: "relative",
              }}
            >
              <Center h="100%" style={{ position: "relative" }}>
                {[1, 2, 3, 4].map((n) => (
                  <Box
                    key={n}
                    aria-hidden
                    style={{
                      position: "absolute",
                      borderRadius: "50%",
                      border: "1px solid var(--app-border)",
                      width: `${n * 22}%`,
                      height: `${n * 22}%`,
                      opacity: 1 - n * 0.15,
                    }}
                  />
                ))}
                <ThemeIcon color="forest" size={56} radius="xl">
                  <LeafIcon size={24} weight="thin" />
                </ThemeIcon>
                <Text
                  component="span"
                  ff="var(--mantine-font-family-monospace)"
                  fz="0.68rem"
                  c="var(--app-text-muted)"
                  style={{
                    letterSpacing: '0.18em',
                    textTransform: 'uppercase',
                    position: "absolute",
                    bottom: 20,
                    left: "50%",
                    transform: "translateX(-50%)",
                    whiteSpace: "nowrap",
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
  );
}

function StatusBadge({ children }: { children: string }) {
  return (
    <Badge color="gold" leftSection={<span style={{ display: 'inline-block', width: 6, height: 6, borderRadius: 999, background: 'currentColor', boxShadow: '0 0 6px currentColor' }} />} mb={24}>
      {children}
    </Badge>
  );
}

function ProjectTags({ mb }: { mb?: number }) {
  const tags = [
    { icon: <TimerIcon size={14} />, label: m.project_tag_time() },
    {
      icon: <CurrencyCircleDollarIcon size={14} />,
      label: m.project_tag_finance(),
    },
    {
      icon: <CalendarDotsIcon size={14} />,
      label: m.project_tag_calendar(),
    },
    { icon: <CodeIcon size={14} />, label: m.project_tag_management() },
  ];

  return (
    <Group gap={10} mb={mb}>
      {tags.map(({ icon, label }) => (
        <Badge key={label} variant="default" leftSection={icon}>
          {label}
        </Badge>
      ))}
    </Group>
  );
}
