import { Anchor, List, NavLink, Stack, Text, type MantineSpacing } from '@mantine/core'
import { useLingui } from '@lingui/react/macro'
import {
  ArrowUpRight,
  EnvelopeSimple,
  GithubLogo,
  LinkedinLogo,
  type Icon,
} from '@phosphor-icons/react'
import { eventAttributes, type AnalyticsEvent } from '#/analytics/umami'
import type { Profile, ProfileLink } from '#/content'
import { useProfile } from '#/content/react'

/** The address of the Profile's email link ("hello@gwydion.dev"). */
export function emailAddressOf(profile: Profile): string | undefined {
  const email = profile.links.find((link) => link.kind === 'email' && !link.placeholder)
  return email?.href.replace(/^mailto:/, '')
}

/** The Profile's email address as a working mailto link. */
export function EmailLink({ className = '' }: { className?: string }) {
  const address = emailAddressOf(useProfile())
  if (!address) return null
  return (
    <Anchor
      href={`mailto:${address}`}
      {...eventAttributes(PROFILE_LINK_EVENTS.email)}
      inherit
      fw={500}
      c="var(--ink)"
      underline="always"
      className={className}
    >
      {address}
    </Anchor>
  )
}

/**
 * How to reach Gwydion directly: the Profile's email, LinkedIn and GitHub
 * links. A placeholder link is named, dimmed, and not a working link.
 * The Contact view lists them, and the shell offers them on every page.
 */
export function ProfileLinks({ mt = 8 }: { /** Space above the list. */ mt?: MantineSpacing }) {
  const { t } = useLingui()
  const profile = useProfile()
  const labels = useProfileLinkLabels()
  return (
    <List listStyleType="none" spacing={8} mt={mt} center>
      {profile.links.map((link) => {
        const Icon = ICONS[link.kind]
        return (
          <List.Item
            key={link.kind}
            icon={<Icon aria-hidden size={16} color="var(--subtle)" style={{ display: 'block' }} />}
          >
            {link.placeholder ? (
              <span className="stand-in">
                <span>{labels[link.kind]}</span>{' '}
                <Text component="span" size="xs">
                  ({t`coming soon`})
                </Text>
              </span>
            ) : (
              <Anchor
                href={link.href}
                {...eventAttributes(PROFILE_LINK_EVENTS[link.kind])}
                inherit
                fw={500}
                c="var(--ink)"
                {...(link.kind === 'email' ? {} : { target: '_blank', rel: 'noopener noreferrer' })}
              >
                {labels[link.kind]}
              </Anchor>
            )}
          </List.Item>
        )
      })}
    </List>
  )
}

/** The Profile links as rows like the sidebar's navigation entries (Mantine NavLink). */
export function ProfileLinkRows() {
  const { t } = useLingui()
  const profile = useProfile()
  const labels = useProfileLinkLabels()
  return (
    <Stack component="ul" gap={2} m={0} p={0} style={{ listStyle: 'none' }}>
      {profile.links.map((link) => {
        const Icon = ICONS[link.kind]
        const external = link.kind !== 'email'
        const icon = <Icon aria-hidden size={16} />
        return (
          <li key={link.kind}>
            {link.placeholder ? (
              <NavLink
                component="span"
                className="stand-in"
                label={labels[link.kind]}
                leftSection={icon}
                rightSection={<Text size="xs">{t`coming soon`}</Text>}
              />
            ) : (
              <NavLink
                href={link.href}
                {...eventAttributes(PROFILE_LINK_EVENTS[link.kind])}
                label={labels[link.kind]}
                leftSection={icon}
                rightSection={external && <ArrowUpRight aria-hidden size={14} />}
                {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
              />
            )}
          </li>
        )
      })}
    </Stack>
  )
}

/** What each Profile link is called: the email link by its address. */
function useProfileLinkLabels(): Record<ProfileLink['kind'], string> {
  const { t } = useLingui()
  return {
    email: emailAddressOf(useProfile()) ?? t`Email`,
    linkedin: 'LinkedIn',
    github: 'GitHub',
  }
}

/** What a click on each Profile link counts as. */
const PROFILE_LINK_EVENTS: Record<ProfileLink['kind'], AnalyticsEvent> = {
  email: { name: 'mail-klick' },
  linkedin: { name: 'linkedin-klick' },
  github: { name: 'github-klick' },
}

const ICONS: Record<ProfileLink['kind'], Icon> = {
  email: EnvelopeSimple,
  linkedin: LinkedinLogo,
  github: GithubLogo,
}
