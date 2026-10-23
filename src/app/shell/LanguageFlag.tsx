import type { Locale } from '#/generated/paraglide/runtime'

const FLAG_BY_LOCALE: Record<Locale, { src: string; name: string }> = {
  en: { src: '/flags/gb.svg', name: 'English' },
  de: { src: '/flags/de.svg', name: 'Deutsch' },
}

interface LanguageFlagProps {
  locale: Locale
}

export function LanguageFlag({ locale }: LanguageFlagProps) {
  const flag = FLAG_BY_LOCALE[locale] ?? FLAG_BY_LOCALE.en

  return (
    <img
      src={flag.src}
      alt=""
      aria-hidden
      className="language-flag"
      width={20}
      height={15}
      loading="lazy"
      decoding="async"
    />
  )
}

export function getLanguageName(locale: Locale) {
  return (FLAG_BY_LOCALE[locale] ?? FLAG_BY_LOCALE.en).name
}
