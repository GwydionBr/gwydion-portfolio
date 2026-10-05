import { useComputedColorScheme } from '@mantine/core'
import { useEffect } from 'react'
import { FAVICON_BY_SCHEME, THEME_COLOR_BY_SCHEME } from './themeChrome'

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
