import type { ReactNode } from 'react'
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
  return (
    <List listStyleType="none" spacing={8} mt={mt} center>
      {useProfileLinkItems().map((link) => (
        <List.Item
          key={link.kind}
          icon={
            <link.icon aria-hidden size={16} color="var(--subtle)" style={{ display: 'block' }} />
          }
        >
          {link.placeholder ? (
            <span className="stand-in">
              <span>{link.label}</span>{' '}
              <Text component="span" size="xs">
                ({t`coming soon`})
              </Text>
            </span>
          ) : (
            <Anchor
              href={link.href}
              {...eventAttributes(link.event)}
              inherit
              fw={500}
              c="var(--ink)"
              {...(link.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
            >
              {link.label}
            </Anchor>
          )}
        </List.Item>
      ))}
    </List>
  )
}

/**
 * The Profile links as rows like the sidebar's navigation entries (Mantine
 * NavLink). `wrapRow` puts something around each row, given its label, such
 * as the sidebar's tooltip.
 */
export function ProfileLinkRows({
  wrapRow = (row) => row,
}: {
  wrapRow?: (row: ReactNode, label: string) => ReactNode
}) {
  const { t } = useLingui()
  return (
    <Stack component="ul" gap={2} m={0} p={0} style={{ listStyle: 'none' }}>
      {useProfileLinkItems().map((link) => {
        const icon = <link.icon aria-hidden size={16} />
        return (
          <li key={link.kind}>
            {wrapRow(
              link.placeholder ? (
                <NavLink
                  component="span"
                  className="stand-in"
                  label={link.label}
                  leftSection={icon}
                  rightSection={<Text size="xs">{t`coming soon`}</Text>}
                />
              ) : (
                <NavLink
                  href={link.href}
                  {...eventAttributes(link.event)}
                  label={link.label}
                  leftSection={icon}
                  rightSection={link.external && <ArrowUpRight aria-hidden size={14} />}
                  {...(link.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                />
              ),
              link.label,
            )}
          </li>
        )
      })}
    </Stack>
  )
}

/** One Profile link as every place offering it shows it. */
export interface ProfileLinkItem {
  kind: ProfileLink['kind']
  href: string
  /** What it is called: the email link by its address. */
  label: string
  icon: Icon
  /** Whether it leaves the site (opened in a new tab); the email link opens the mail program. */
  external: boolean
  /** Named but not a working link yet. */
  placeholder: boolean
  /** What a click on it counts as. */
  event: AnalyticsEvent
}

/** The Profile links, in the Profile's order: what each is called, shown as and counted as. */
export function useProfileLinkItems(): ProfileLinkItem[] {
  const { t } = useLingui()
  const profile = useProfile()
  const labels: Record<ProfileLink['kind'], string> = {
    email: emailAddressOf(profile) ?? t`Email`,
    linkedin: 'LinkedIn',
    github: 'GitHub',
  }
  return profile.links.map((link) => ({
    kind: link.kind,
    href: link.href,
    label: labels[link.kind],
    icon: ICONS[link.kind],
    external: link.kind !== 'email',
    placeholder: Boolean(link.placeholder),
    event: PROFILE_LINK_EVENTS[link.kind],
  }))
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
