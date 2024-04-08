import supportedLanguages from "@assets/locales/supportedLocales.json"

export const SUPPORTED_LANGUAGES: { code: string; name: string }[] =
  supportedLanguages

export const getLocale = (tag: string): Intl.Locale | null => {
  try {
    return new Intl.Locale(tag)
  } catch {
    return null
  }
}
