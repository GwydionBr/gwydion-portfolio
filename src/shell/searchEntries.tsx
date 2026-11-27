import type { ReactNode } from 'react'
import { useLingui } from '@lingui/react/macro'
import { Center } from '@mantine/core'
import { useNavigate } from '@tanstack/react-router'
import {
  ArrowUpRight,
  Check,
  CircleHalf,
  Copy,
  DownloadSimple,
  Moon,
  Sun,
  Translate,
  type Icon,
} from '@phosphor-icons/react'
import { trackEvent } from '#/analytics/umami'
import { downloadCv } from '#/components/CvDownload'
import { useCopyEmail, useProfileLinkItems } from '#/components/ProfileLinks'
import { trackProjectClick } from '#/components/ProjectPageLink'
import { ProjectSwatch } from '#/components/ProjectSwatch'
import { useCv, useProjects } from '#/content/react'
import { LANGUAGES, nativeNameOf } from '#/i18n/language'
import { useSiteLanguage } from '#/i18n/react'
import { useTheme } from '#/theme/react'
import { THEME_PREFERENCES, type ThemePreference } from '#/theme/theme'
import { usePageInLanguage } from './LanguageSwitch'
import { useNavigationEntries } from './navigation'
import type { SearchGroup, Searchable } from './searchFilter'
import { useThemePreferenceLabels } from './ThemeSwitch'

/** One thing the search finds: somewhere to go or something to do. */
export interface SearchEntry extends Searchable {
  /** Unique among all entries. */
  id: string
  /** Shown before the label, such as an icon. */
  leading: ReactNode
  /** Shown after it, such as a mark that it opens another site. */
  trailing?: ReactNode
  /** What choosing it does. */
  run: () => void
}

const THEME_ICONS: Record<ThemePreference, Icon> = { system: CircleHalf, light: Sun, dark: Moon }

const icon = (Shown: Icon) => <Shown aria-hidden size={18} />

/**
 * Everything the search finds, in the Site language of the page shown: the
 * views of the navigation, every Project, the ways to reach Gwydion (the CV
 * download and copying the email address among them) and the site settings. Each does what its counterpart
 * elsewhere on the site does, counted the same way.
 */
export function useSearchGroups(): SearchGroup<SearchEntry>[] {
  const { t, i18n } = useLingui()
  const lang = useSiteLanguage()
  const navigate = useNavigate()
  const pages = useNavigationEntries()
  const projects = useProjects()
  const cv = useCv()
  const links = useProfileLinkItems().filter((link) => !link.placeholder)
  const copyEmail = useCopyEmail()
  const pageIn = usePageInLanguage()
  const { preference, choose } = useTheme()
  const themeLabels = useThemePreferenceLabels()

  return [
    {
      label: t`Pages`,
      entries: pages.map((entry) => ({
        id: `page:${entry.to}`,
        label: i18n._(entry.label),
        leading: icon(entry.icon),
        run: () => void navigate({ to: entry.to, params: { lang } }),
      })),
    },
    {
      label: t`Projects`,
      entries: projects.map((project) => ({
        id: `project:${project.slug}`,
        label: project.title,
        description: project.summary,
        keywords: project.stack,
        // As wide as the icons, so every label starts at the same place.
        leading: (
          <Center component="span" w={18} h={18}>
            <ProjectSwatch accent={project.accent} />
          </Center>
        ),
        run: () => {
          trackProjectClick(project.slug)
          void navigate({ to: '/$lang/projects/$slug', params: { lang, slug: project.slug } })
        },
      })),
    },
    {
      label: t`Contact`,
      entries: [
        {
          id: 'cv',
          label: t`Download CV`,
          description:
            cv.language === lang
              ? t`1 page · PDF`
              : `${t`1 page · PDF`} · ${nativeNameOf(cv.language)}`,
          keywords: [t`CV`],
          leading: icon(DownloadSimple),
          run: () => downloadCv(cv),
        },
        ...links.map((link) => ({
          id: `link:${link.kind}`,
          label: link.label,
          description: link.kind === 'email' ? t`Write an email` : undefined,
          leading: icon(link.icon),
          trailing: link.external ? <ArrowUpRight aria-hidden size={14} /> : undefined,
          run: () => {
            trackEvent(link.event)
            if (link.external) window.open(link.href, '_blank', 'noopener,noreferrer')
            else window.location.href = link.href
          },
        })),
        ...(copyEmail
          ? [
              {
                id: 'copy-email',
                label: t`Copy email address`,
                keywords: [t`Email`],
                leading: icon(Copy),
                run: () => void copyEmail(),
              },
            ]
          : []),
      ],
    },
    {
      label: t`Settings`,
      entries: [
        ...LANGUAGES.filter((language) => language !== lang).map((language) => ({
          id: `language:${language}`,
          label: nativeNameOf(language),
          description: t`Site language`,
          leading: icon(Translate),
          run: () => void navigate({ to: pageIn(language) }),
        })),
        ...THEME_PREFERENCES.map((option) => ({
          id: `theme:${option}`,
          label: themeLabels[option],
          description: t`Theme`,
          leading: icon(THEME_ICONS[option]),
          trailing:
            option === preference ? (
              <Check role="img" aria-label={t`Current`} size={14} />
            ) : undefined,
          run: () => choose(option),
        })),
      ],
    },
  ]
}
