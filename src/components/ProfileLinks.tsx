import type { ReactNode } from 'react'
import {
  ActionIcon,
  Anchor,
  Group,
  List,
  NavLink,
  Stack,
  Text,
  Tooltip,
  type MantineSpacing,
} from '@mantine/core'
import { useLingui } from '@lingui/react/macro'
import {
  ArrowUpRight,
  Copy,
  EnvelopeSimple,
  GithubLogo,
  LinkedinLogo,
  type Icon,
} from '@phosphor-icons/react'
import { eventAttributes, trackEvent, type AnalyticsEvent } from '#/analytics/umami'
import type { Profile, ProfileLink } from '#/content'
import { useProfile } from '#/content/react'
import { SIDEBAR_ICON_SIZE } from '#/shell/sidebarLayout'
import { useToast } from '#/shell/toast'

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
 * links, the email with a button that copies it. A placeholder link is
 * named, dimmed, and not a working link. The Contact view lists them, and
 * the shell offers them on every page.
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
            <Group gap={4} wrap="nowrap">
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
              {link.kind === 'email' && <CopyEmailButton />}
            </Group>
          )}
        </List.Item>
      ))}
    </List>
  )
}

/**
 * Copying the Profile's email address to the clipboard, for a visitor who
 * writes from somewhere other than their mail program: the address is
 * copied, a toast says so, and the copy is counted. Should the browser
 * refuse, the toast says so and names the address. `undefined` while the
 * Profile has no working email link.
 */
export function useCopyEmail(): (() => Promise<void>) | undefined {
  const { t } = useLingui()
  const address = emailAddressOf(useProfile())
  const showToast = useToast()
  if (!address) return undefined
  return async () => {
    try {
      await navigator.clipboard.writeText(address)
    } catch {
      showToast({
        id: 'email-not-copied',
        tone: 'danger',
        message: t`The address could not be copied. It is ${address}.`,
      })
      return
    }
    trackEvent({ name: 'mail-kopiert' })
    showToast({ id: 'email-copied', message: t`Email address copied` })
  }
}

/** A small button that copies the Profile's email address, named in its tooltip. */
export function CopyEmailButton() {
  const { t } = useLingui()
  const copy = useCopyEmail()
  if (!copy) return null
  const label = t`Copy email address`
  return (
    <Tooltip label={label}>
      <ActionIcon variant="subtle" size="sm" aria-label={label} onClick={() => void copy()}>
        <Copy aria-hidden size={14} />
      </ActionIcon>
    </Tooltip>
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
        const icon = <link.icon aria-hidden size={SIDEBAR_ICON_SIZE} />
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
