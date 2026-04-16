import { Link } from '@tanstack/react-router'
import { Anchor, Box, Container, Group, Stack, Text, Title } from '@mantine/core'
import { GithubLogoIcon, ArrowUpRightIcon } from '@phosphor-icons/react'
import { GITHUB_PROFILE_URL, GITHUB_SITE_REPO_URL } from '../lib/githubUrls'
import * as m from '../paraglide/messages'
import { Eyebrow } from './ui/Page'

const FOOTER_COLUMNS = [
  {
    heading: m.footer_pages,
    links: [
      { href: '/', label: m.nav_home },
      { href: '/about', label: m.nav_about },
      { href: '/projects', label: m.nav_projects },
    ],
  },
  {
    heading: m.footer_more,
    links: [
      { href: '/blog', label: m.nav_blog },
      { href: '/contact', label: m.nav_contact },
    ],
  },
  {
    heading: m.footer_legal,
    links: [
      { href: '/impressum', label: m.nav_imprint },
      { href: '/datenschutz', label: m.nav_privacy },
    ],
  },
]

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <Box
      component="footer"
      mt={120}
      pt={48}
      pb={56}
      px={28}
      style={{
        position: 'relative',
        zIndex: 1,
        borderTop: '1px solid var(--app-border)',
      }}
    >
      <Container size={1080} px={0}>
        <Group align="flex-start" justify="space-between" gap={40} wrap="wrap">
          <Stack gap={10}>
            <Link to="/" style={{ textDecoration: 'none' }}>
              <Title
                order={2}
                className="display"
                style={{ fontSize: '1.35rem' }}
              >
                gwydion<Text component="span" c="gold">.</Text>
              </Title>
            </Link>
            <Text size="xs" c="var(--app-text-muted)" ff="var(--mantine-font-family-monospace)" style={{ letterSpacing: '0.05em' }}>
              {m.footer_built()}
            </Text>
          </Stack>

          <Group component="nav" align="flex-start" gap={40} wrap="wrap">
            {FOOTER_COLUMNS.map(({ heading, links }) => (
              <Stack key={heading()} gap={12}>
                <Eyebrow>{heading()}</Eyebrow>
                {links.map(({ href, label }) => (
                  <Link key={href} to={href} className="nav-link">
                    {label()}
                  </Link>
                ))}
                {heading === m.footer_more && (
                  <Anchor
                    href={GITHUB_PROFILE_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="nav-link"
                    c="var(--app-text-secondary)"
                    underline="never"
                  >
                    <Group component="span" gap={4}>
                      GitHub <ArrowUpRightIcon size={12} />
                    </Group>
                  </Anchor>
                )}
              </Stack>
            ))}
          </Group>
        </Group>

        <Group
          mt={40}
          pt={20}
          justify="space-between"
          gap={12}
          wrap="wrap"
          style={{ borderTop: '1px solid var(--app-border-subtle)' }}
        >
          <Text size="xs" c="var(--app-text-muted)" ff="var(--mantine-font-family-monospace)">
            © {year} Gwydion Braunsdorf
          </Text>
          <Anchor
            href={GITHUB_SITE_REPO_URL}
            target="_blank"
            rel="noopener noreferrer"
            size="xs"
            c="var(--app-text-muted)"
            underline="never"
          >
            <Group component="span" gap={6}>
              <GithubLogoIcon size={14} weight="light" />
              {m.footer_source()}
            </Group>
          </Anchor>
        </Group>
      </Container>
    </Box>
  )
}
