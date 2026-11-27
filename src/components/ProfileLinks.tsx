import { Anchor, Group, Stack, Text } from '@mantine/core'
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
import sidebar from '#/shell/Sidebar.module.css'
import lists from './lists.module.css'
import classes from './ProfileLinks.module.css'

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
export function ProfileLinks({ className }: { className?: string }) {
  const { t } = useLingui()
  const profile = useProfile()
  const labels = useProfileLinkLabels()
  return (
    <Stack
      component="ul"
      mt={className === undefined ? 8 : undefined}
      gap={8}
      className={`${lists.reset} ${className ?? ''}`}
    >
      {profile.links.map((link) => {
        const Icon = ICONS[link.kind]
        return (
          <Group component="li" key={link.kind} miw={0} gap={8} wrap="nowrap">
            <Icon aria-hidden className={sidebar.icon} />
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
                truncate
                inherit
                fw={500}
                c="var(--ink)"
                {...(link.kind === 'email' ? {} : { target: '_blank', rel: 'noopener noreferrer' })}
              >
                {labels[link.kind]}
              </Anchor>
            )}
          </Group>
        )
      })}
    </Stack>
  )
}

/** The Profile links as rows like the sidebar's navigation entries. */
export function ProfileLinkRows() {
  const { t } = useLingui()
  const profile = useProfile()
  const labels = useProfileLinkLabels()
  return (
    <Stack component="ul" gap={2} className={lists.reset}>
      {profile.links.map((link) => {
        const Icon = ICONS[link.kind]
        const external = link.kind !== 'email'
        const icon = <Icon aria-hidden className={sidebar.icon} />
        return (
          <li key={link.kind}>
            {link.placeholder ? (
              <span className={`stand-in ${sidebar.entry} ${classes.placeholder}`}>
                {icon}
                <span>{labels[link.kind]}</span>
                <Text component="span" ml="auto" size="xs">{t`coming soon`}</Text>
              </span>
            ) : (
              <Anchor
                href={link.href}
                {...eventAttributes(PROFILE_LINK_EVENTS[link.kind])}
                underline="never"
                className={sidebar.entry}
                {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
              >
                {icon}
                <Text component="span" inherit truncate>
                  {labels[link.kind]}
                </Text>
                {external && (
                  <ArrowUpRight
                    aria-hidden
                    className={sidebar.icon}
                    style={{ width: 14, height: 14, marginInlineStart: 'auto' }}
                  />
                )}
              </Anchor>
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
