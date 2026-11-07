import { LANGUAGES, type Language } from '#/i18n/language'

/**
 * A text (or any value) stored in every Site language side by side. Content
 * stores only what differs per language this way; everything else exists once.
 */
export type Localized<T> = { [L in Language]: T }

/** `T` as one Site language sees it: every `Localized<X>` inside it, at any depth, becomes `X`. */
export type InLanguage<T> =
  T extends Localized<infer U>
    ? InLanguage<U>
    : T extends readonly (infer E)[]
      ? InLanguage<E>[]
      : T extends object
        ? { [K in keyof T]: InLanguage<T[K]> }
        : T

/** Whether `value` is a `Localized` value: a plain object keyed by Site languages only. */
function isLocalized(value: object): value is Partial<Localized<unknown>> {
  const keys = Object.keys(value)
  return keys.length > 0 && keys.every((key) => (LANGUAGES as string[]).includes(key))
}

/**
 * `value` resolved to `language`: every `Localized` inside it replaced by its
 * text in that language. No fallback: a text absent in `language` stays
 * absent, so the content-integrity check sees it.
 */
export function inLanguage<T>(value: T, language: Language): InLanguage<T> {
  if (Array.isArray(value)) return value.map((item) => inLanguage(item, language)) as InLanguage<T>
  if (value === null || typeof value !== 'object') return value as InLanguage<T>
  if (isLocalized(value)) return inLanguage(value[language], language) as InLanguage<T>
  return Object.fromEntries(
    Object.entries(value).map(([key, field]) => [key, inLanguage(field, language)]),
  ) as InLanguage<T>
}
