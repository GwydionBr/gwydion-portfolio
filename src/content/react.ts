import { useRouteContext } from '@tanstack/react-router'
import { useSiteLanguage } from '#/i18n/react'
import type { Content } from './index'

/** The content module, from the router context (`createAppRouter`). */
export function useContent(): Content {
  return useRouteContext({ from: '__root__', select: (context) => context.content })
}

/** The Profile in the Site language of the page shown. */
export function useProfile() {
  const language = useSiteLanguage()
  return useContent().getProfile(language)
}

/** Every Post, newest first. */
export function usePosts() {
  return useContent().getPosts()
}

/** The Career entries, newest first, in the Site language of the page shown. */
export function useCareerEntries() {
  const language = useSiteLanguage()
  return useContent().getCareerEntries(language)
}

/** The CV the Site language of the page shown offers. */
export function useCv() {
  const language = useSiteLanguage()
  return useContent().getCv(language)
}
