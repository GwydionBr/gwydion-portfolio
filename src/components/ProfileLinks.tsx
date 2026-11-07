import { useLingui } from '@lingui/react/macro'
import { EnvelopeSimple, GithubLogo, LinkedinLogo, type Icon } from '@phosphor-icons/react'
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
    <a href={`mailto:${address}`} className={`font-medium text-ink underline ${className}`}>
      {address}
    </a>
  )
}

/**
 * How to reach Gwydion directly: the Profile's email, LinkedIn and GitHub
 * links. A placeholder link is named, dimmed, and not a working link.
 * The Contact view lists them, and the shell offers them on every page.
 */
export function ProfileLinks({ className = 'mt-2 space-y-2' }: { className?: string }) {
  const { t } = useLingui()
  const profile = useProfile()
  const labels: Record<ProfileLink['kind'], string> = {
    email: emailAddressOf(profile) ?? t`Email`,
    linkedin: 'LinkedIn',
    github: 'GitHub',
  }
  return (
    <ul className={className}>
      {profile.links.map((link) => {
        const Icon = ICONS[link.kind]
        return (
          <li key={link.kind} className="flex min-w-0 items-center gap-2">
            <Icon aria-hidden className="size-4 shrink-0 text-subtle" />
            {link.placeholder ? (
              <span className="stand-in">
                <span>{labels[link.kind]}</span> <span className="text-xs">({t`coming soon`})</span>
              </span>
            ) : (
              <a
                href={link.href}
                className="truncate font-medium text-ink hover:underline"
                {...(link.kind === 'email' ? {} : { target: '_blank', rel: 'noopener noreferrer' })}
              >
                {labels[link.kind]}
              </a>
            )}
          </li>
        )
      })}
    </ul>
  )
}

const ICONS: Record<ProfileLink['kind'], Icon> = {
  email: EnvelopeSimple,
  linkedin: LinkedinLogo,
  github: GithubLogo,
}
