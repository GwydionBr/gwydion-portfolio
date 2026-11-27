import { THEMES, type Theme } from '#/theme/theme'
import { LANGUAGES, type Language } from '#/i18n/language'
import { inLanguage } from './localized'
import type { Screenshot, ScreenshotSetSource, ScreenshotSource } from './schema'

/**
 * The file names of one screenshot in `language` and `theme`, at both
 * resolutions. The Self-Engine repo owns this naming (its
 * apps/web/src/marketing/screenshots/README.md): the 2× file is
 * `<view>-<language>-<theme>.webp`, its 1× copy adds `-<width>w`.
 */
export function screenshotFileNames(
  { view, size }: Pick<ScreenshotSource, 'view' | 'size'>,
  language: Language,
  theme: Theme,
) {
  const base = `${view}-${language}-${theme}`
  return { oneX: `${base}-${size.width}w.webp`, twoX: `${base}.webp` }
}

/**
 * Every file `shots` need: each screenshot in each of `languages` (every Site
 * language unless told otherwise) and each theme, at both resolutions.
 */
export function expectedScreenshotFiles(
  shots: readonly ScreenshotSource[],
  languages: readonly Language[] = LANGUAGES,
): string[] {
  return shots.flatMap((shot) =>
    languages.flatMap((language) =>
      THEMES.flatMap((theme) => {
        const { oneX, twoX } = screenshotFileNames(shot, language, theme)
        return [oneX, twoX]
      }),
    ),
  )
}

/**
 * The URLs `shots` need, picked out of `available` (the Self-Engine repo's
 * `screenshotUrls.json`), and the files it lacks.
 */
export function pickScreenshotUrls(
  shots: readonly ScreenshotSource[],
  available: Readonly<Partial<Record<string, string>>>,
) {
  const urls: Record<string, string> = {}
  const missing: string[] = []
  for (const file of expectedScreenshotFiles(shots)) {
    const url = available[file]
    if (url) urls[file] = url
    else missing.push(file)
  }
  return { urls, missing }
}

/**
 * A set whose image files are kept in this repo, under `public` at
 * `directory` (`/screenshots/<slug>`), captured in `language` only: the
 * interface of the app they show exists in that one language.
 */
export function localScreenshotSet(
  directory: `/${string}`,
  language: Language,
  shots: ScreenshotSource[],
): ScreenshotSetSource {
  return {
    shots,
    language,
    urls: Object.fromEntries(
      expectedScreenshotFiles(shots, [language]).map((file) => [file, `${directory}/${file}`]),
    ),
  }
}

/**
 * The screenshots of `set` with their texts in `language`, each with its
 * image per theme: captured in `language`, or in the set's one language.
 */
export function screenshotsIn(set: ScreenshotSetSource, language: Language): Screenshot[] {
  return set.shots.map((shot) => {
    const { width, height } = shot.size
    const imageIn = (theme: Theme) => {
      const { oneX, twoX } = screenshotFileNames(shot, set.language ?? language, theme)
      const oneXUrl = set.urls[oneX]
      const twoXUrl = set.urls[twoX]
      if (!oneXUrl || !twoXUrl) return undefined
      return { src: twoXUrl, srcSet: `${oneXUrl} ${width}w, ${twoXUrl} ${width * 2}w` }
    }
    return {
      view: shot.view,
      width,
      height,
      caption: inLanguage(shot.caption, language),
      alt: inLanguage(shot.alt, language),
      images: Object.fromEntries(THEMES.map((theme) => [theme, imageIn(theme)])) as Record<
        Theme,
        ReturnType<typeof imageIn>
      >,
    }
  })
}
