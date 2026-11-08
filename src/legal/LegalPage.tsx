import { useLingui } from '@lingui/react/macro'
import { Link, useLocation } from '@tanstack/react-router'
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
      <div className="space-y-4">
        {lang !== BINDING_LANGUAGE && (
          <p role="note" className="rounded-2xl bg-surface p-5 text-ink ring-1 ring-line">
            {t`This English version is a courtesy translation. Only the German version is legally binding.`}{' '}
            <Link
              to={pathInLanguage(pathname, BINDING_LANGUAGE)}
              hrefLang={BINDING_LANGUAGE}
              className="font-medium underline underline-offset-2"
            >
              {t`Read the German version`}
            </Link>
          </p>
        )}
        {page.withContents && (
          <nav aria-label={t`Contents`} className="rounded-2xl bg-surface p-5 ring-1 ring-line">
            <ol className="list-decimal space-y-1 pl-5">
              {sections.map((section) => (
                <li key={section.id}>
                  <a href={`#${section.id}`} className="hover:text-ink hover:underline">
                    {section.title}
                  </a>
                </li>
              ))}
            </ol>
          </nav>
        )}
        {sections.map((section) => (
          <Section key={section.id} section={section} />
        ))}
      </div>
    </View>
  )
}

function Section({ section }: { section: LegalSection }) {
  return (
    <section
      id={section.id}
      aria-labelledby={`${section.id}-title`}
      className="scroll-mt-20 rounded-2xl bg-surface p-5 ring-1 ring-line"
    >
      <h2 id={`${section.id}-title`} className="mb-3 text-base font-semibold text-ink">
        {section.title}
      </h2>
      <div className="space-y-3 leading-relaxed">
        {section.paragraphs.map((paragraph, index) => (
          <p key={index}>
            <Linkified text={paragraph} />
          </p>
        ))}
      </div>
    </section>
  )
}

/** `text` with every bare URL as an external link. */
function Linkified({ text }: { text: string }) {
  return text.split(URL_SPLIT).map((part, index) =>
    IS_URL.test(part) ? (
      <a
        key={index}
        href={part}
        target="_blank"
        rel="noopener noreferrer"
        className="break-all text-ink underline underline-offset-2"
      >
        {part}
      </a>
    ) : (
      part
    ),
  )
}
