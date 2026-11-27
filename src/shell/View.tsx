import type { CSSProperties, ReactNode } from 'react'
import { useLingui } from '@lingui/react/macro'
import { Box, Group, Paper, Text, Title } from '@mantine/core'
import { CaretLeft } from '@phosphor-icons/react'
import { trackEvent } from '#/analytics/umami'
import { RouterButton } from '#/components/links'
import { useSiteLanguage } from '#/i18n/react'
import { SHELL_BREAKPOINT } from './breakpoint'

/** A list view a detail view leads back to. */
export interface BackTarget {
  to: '/$lang/projects'
  /** The Back control's accessible name, for example "Back to Projects". */
  label: string
  /** What the control shows beside its arrow: the list's name. */
  text: string
}

/**
 * A view in the main pane: the location line, the view's title (its one
 * `h1`) and the view's action, then the view's content. Every page renders
 * through it.
 *
 * - `action` sits beside the title: "Get in touch" unless the view passes its
 *   own, or `null` for none. On phones a full-width action wraps below the title.
 * - `hero` turns the header into the Overview's hero: a larger title with the
 *   hero's content (pitch, calls to action) under it, and no action beside it.
 * - `back` (a detail view): on phones, where the sidebar is gone, a Back
 *   control to its list instead of the location line.
 */
export function View({
  title,
  location = [title],
  back,
  action,
  hero,
  children,
}: {
  title: string
  /** The location line after the site's name; the title by default, empty on the Overview. */
  location?: string[]
  /** The list this detail view belongs to. */
  back?: BackTarget
  /** Beside the title; "Get in touch" when left out, nothing when `null`. */
  action?: ReactNode
  /** Under a larger title, instead of an action. */
  hero?: ReactNode
  children: ReactNode
}) {
  const lang = useSiteLanguage()
  const locationLine = (
    <Text size="xs" c="var(--subtle)" truncate visibleFrom={back ? SHELL_BREAKPOINT : undefined}>
      {['gwydion.dev', ...location].join(' / ')}
    </Text>
  )
  if (hero)
    return (
      <>
        <Box component="header" mb={40} maw={768}>
          {locationLine}
          <Title order={1} mt="sm" fz={{ base: '1.875rem', xs: '2.25rem' }} lh={1.2}>
            {title}
          </Title>
          {hero}
        </Box>
        {children}
      </>
    )
  return (
    <>
      <Group component="header" mb="lg" justify="space-between" align="flex-end" gap="md">
        <Box miw={0}>
          {back && (
            <RouterButton
              to={back.to}
              params={{ lang }}
              aria-label={back.label}
              // It leads up to the list; the list is not the page shown.
              activeOptions={{ exact: true }}
              hiddenFrom={SHELL_BREAKPOINT}
              variant="subtle"
              size="compact-sm"
              ml={-6}
              mb={4}
              leftSection={<CaretLeft aria-hidden size={16} />}
            >
              {back.text}
            </RouterButton>
          )}
          {locationLine}
          <Title order={1} mt={4}>
            {title}
          </Title>
        </Box>
        {action === undefined ? <ContactAction style={{ flexShrink: 0 }} /> : action}
      </Group>
      {children}
    </>
  )
}

/** "Get in touch": a button-styled link to Contact. */
export function ContactAction({
  look = 'primary',
  style,
}: {
  look?: 'primary' | 'secondary'
  /** Placement only. */
  style?: CSSProperties
}) {
  const { t } = useLingui()
  const lang = useSiteLanguage()
  return (
    <RouterButton
      to="/$lang/contact"
      params={{ lang }}
      onClick={() => trackEvent({ name: 'kontakt-klick' })}
      variant={look === 'primary' ? 'filled' : 'default'}
      style={style}
    >
      {t`Get in touch`}
    </RouterButton>
  )
}

/** A card standing in for a view's content until its ticket builds it. */
export function Placeholder({ children }: { children: ReactNode }) {
  return (
    <Paper maw={672} p="lg" c="var(--subtle)">
      {children}
    </Paper>
  )
}
