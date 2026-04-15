import { createContext, useContext, useState, useEffect } from 'react'
import { setLocale, locales } from '../paraglide/runtime'

export type Locale = 'en' | 'de'
const STORAGE_KEY = 'PARAGLIDE_LOCALE'

interface LanguageContextValue {
  lang: Locale
  setLang: (lang: Locale) => void
}

const LanguageContext = createContext<LanguageContextValue>({
  lang: 'en',
  setLang: () => {},
})

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  // Default to 'en' on server — matches SSR output, avoids hydration mismatch
  const [lang, setLangState] = useState<Locale>('en')

  useEffect(() => {
    // After mount: read from localStorage or detect browser language
    const stored = localStorage.getItem(STORAGE_KEY) as Locale | null
    let resolved: Locale = 'en'
    if (stored && (locales as readonly string[]).includes(stored)) {
      resolved = stored
    } else if (navigator.language.toLowerCase().startsWith('de')) {
      resolved = 'de'
    }
    applyLocale(resolved)
    setLangState(resolved)
  }, [])

  const setLang = (newLang: Locale) => {
    applyLocale(newLang)
    localStorage.setItem(STORAGE_KEY, newLang)
    setLangState(newLang)
  }

  return (
    <LanguageContext.Provider value={{ lang, setLang }}>
      {children}
    </LanguageContext.Provider>
  )
}

export const useLanguage = () => useContext(LanguageContext)

function applyLocale(locale: Locale) {
  setLocale(locale, { reload: false })
}
