import { useComputedColorScheme } from '@mantine/core'
import { useEffect } from 'react'

const FAVICON_BY_SCHEME = {
  light: '/favicon-light.svg',
  dark: '/favicon-dark.svg',
} as const

const THEME_COLOR_BY_SCHEME = {
  light: '#f3efe4',
  dark: '#0f1612',
} as const

export function ThemeFaviconSync() {
  const scheme = useComputedColorScheme('light')

  useEffect(() => {
    const favicon = document.querySelector<HTMLLinkElement>('link[data-app-favicon]')
    const themeColor = document.querySelector<HTMLMetaElement>('meta[name="theme-color"]')

    favicon?.setAttribute('href', FAVICON_BY_SCHEME[scheme])
    themeColor?.setAttribute('content', THEME_COLOR_BY_SCHEME[scheme])
  }, [scheme])

  return null
}
