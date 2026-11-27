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
import classes from './LegalPage.module.css'

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
          <Paper
            component="p"
            role="note"
            p={20}
            radius="lg"
            c="var(--ink)"
            className={classes.panel}
          >
            {t`This English version is a courtesy translation. Only the German version is legally binding.`}{' '}
            <RouterAnchor
              to={pathInLanguage(pathname, BINDING_LANGUAGE)}
              hrefLang={BINDING_LANGUAGE}
              fw={500}
              underline="always"
              className={classes.underlined}
            >
              {t`Read the German version`}
            </RouterAnchor>
          </Paper>
        )}
        {page.withContents && (
          <Paper
            component="nav"
            aria-label={t`Contents`}
            p={20}
            radius="lg"
            className={classes.panel}
          >
            <List type="ordered" spacing={4} pl={20} size="sm">
              {sections.map((section) => (
                <List.Item key={section.id}>
                  <Anchor href={`#${section.id}`} className={classes.contentsLink}>
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
      p={20}
      radius="lg"
      id={section.id}
      aria-labelledby={`${section.id}-title`}
      className={classes.panel}
    >
      <Title order={2} id={`${section.id}-title`} mb={12} fz="md" lh={1.5} c="var(--ink)">
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
        className={`${classes.underlined} ${classes.externalLink}`}
      >
        {part}
      </Anchor>
    ) : (
      part
    ),
  )
}
