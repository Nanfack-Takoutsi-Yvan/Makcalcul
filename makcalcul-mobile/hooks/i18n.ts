import * as Localization from "expo-localization"
import { useSelectLocale } from "@store/slices/localization"

export const useLanguageDetector = (): string => {
  const locale = useSelectLocale()
  if (locale) return locale
  else return Localization.locale
}
