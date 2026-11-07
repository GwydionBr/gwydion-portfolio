import { createIsomorphicFn } from '@tanstack/react-start'
import { getRequestHeader } from '@tanstack/react-start/server'
import { preferredLanguageOf, type Language } from './language'

/**
 * The Site language the visitor's browser prefers: the request's
 * `Accept-Language` on the server, `navigator.languages` in the browser;
 * English when neither names a Site language.
 */
export const preferredSiteLanguage = createIsomorphicFn()
  .server((): Language => preferredLanguageOf(getRequestHeader('accept-language')))
  .client((): Language => preferredLanguageOf(navigator.languages))
