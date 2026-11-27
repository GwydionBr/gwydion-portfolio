import { useLingui } from '@lingui/react/macro'
import { useLocation } from '@tanstack/react-router'
import { Anchor, List, Paper, Stack, Text, Title } from '@mantine/core'
import { RouterAnchor } from '#/components/links'
import { pathInLanguage } from '#/i18n/language'
import { useSiteLanguage } from '#/i18n/react'
import { pageHead, type PageMatch } from '#/seo/pageHead'
import { View } from '#/shell/View'
import { BINDING_LANGUAGE, type LegalSection } from './document'
import type { LegalPageDefinition } from './pages'

const URL_SPLIT = /(https?:\/\/[^\s]+)/g
const IS_URL = /^https?:\/\//

/**
 * What a legal page's route needs: its head and its view. The route files
 * only bind their page: `createFileRoute('/$lang/impressum')(legalRoute(IMPRESSUM_PAGE))`.
 */
export function legalRoute(page: LegalPageDefinition) {
  return {
    head: ({ match }: { match: PageMatch }) => pageHead(match, () => page),
    component: function LegalRouteView() {
      return <LegalPage page={page} />
    },
  }
}

/**
 * A legal text as a view: in the Site language, one section per `h2`. Outside
 * the binding language it first says which version is legally binding and
 * links to it.
 */
export function LegalPage({ page }: { page: LegalPageDefinition }) {
  const { t, i18n } = useLingui()
  const lang = useSiteLanguage()
  const { pathname } = useLocation()
  const sections = page.document[lang]
  return (
    <View title={i18n._(page.title)}>
      <Stack gap={16}>
        {lang !== BINDING_LANGUAGE && (
          <Paper component="p" role="note" p="lg" m={0} c="var(--ink)">
            {t`This English version is a courtesy translation. Only the German version is legally binding.`}{' '}
            <RouterAnchor
              to={pathInLanguage(pathname, BINDING_LANGUAGE)}
              hrefLang={BINDING_LANGUAGE}
              fw={500}
              underline="always"
            >
              {t`Read the German version`}
            </RouterAnchor>
          </Paper>
        )}
        {page.withContents && (
          <Paper component="nav" aria-label={t`Contents`} p="lg">
            <List type="ordered" spacing={4} pl={20} size="sm">
              {sections.map((section) => (
                <List.Item key={section.id}>
                  <Anchor href={`#${section.id}`} c="var(--muted)">
                    {section.title}
                  </Anchor>
                </List.Item>
              ))}
            </List>
          </Paper>
        )}
        {sections.map((section) => (
          <Section key={section.id} section={section} />
        ))}
      </Stack>
    </View>
  )
}

function Section({ section }: { section: LegalSection }) {
  return (
    <Paper
      component="section"
      p="lg"
      id={section.id}
      aria-labelledby={`${section.id}-title`}
      style={{ scrollMarginTop: '5rem' }}
    >
      <Title order={2} id={`${section.id}-title`} mb="sm">
        {section.title}
      </Title>
      <Stack gap={12}>
        {section.paragraphs.map((paragraph, index) => (
          <Text key={index} size="sm" lh={1.625}>
            <Linkified text={paragraph} />
          </Text>
        ))}
      </Stack>
    </Paper>
  )
}

/** `text` with every bare URL as an external link. */
function Linkified({ text }: { text: string }) {
  return text.split(URL_SPLIT).map((part, index) =>
    IS_URL.test(part) ? (
      <Anchor
        key={index}
        href={part}
        target="_blank"
        rel="noopener noreferrer"
        underline="always"
        style={{ overflowWrap: 'anywhere' }}
      >
        {part}
      </Anchor>
    ) : (
      part
    ),
  )
}
