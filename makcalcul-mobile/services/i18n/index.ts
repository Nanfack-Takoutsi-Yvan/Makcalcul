import { Settings } from "luxon"
import i18next, { i18n } from "i18next"
import { initReactI18next } from "react-i18next"
import * as Localization from "expo-localization"

import { AppDispatch } from "@store/index"
import { SUPPORTED_LANGUAGES, getLocale } from "@utils/i18n"
import {
  DEFAULT_FALLBACK_LANGUAGE_CODE,
  DEFAULT_FALLBACK_NAMESPACE
} from "@constants/i18n"
import { setI18N } from "@store/slices/localization/i18n"
import resources from "@assets/locales/translations"

export class I18NService {
  private _locale: Intl.Locale | null = null
  private _translationLanguages: Set<string> | null = null
  private _translationLocales: Set<Intl.Locale> | null = null

  private i18n: i18n | null = null

  constructor(private dispatch: AppDispatch) {}

  async start({ lang }: { lang: string }) {
    this._locale = this.determineLocale(
      lang,
      Localization.locale,
      DEFAULT_FALLBACK_LANGUAGE_CODE
    )
    const i18n = i18next
      .createInstance({
        resources,
        lng: this._locale?.baseName,
        fallbackLng: DEFAULT_FALLBACK_LANGUAGE_CODE,
        fallbackNS: DEFAULT_FALLBACK_NAMESPACE,
        nonExplicitSupportedLngs: true,
        supportedLngs: Array.from(this.translationLanguages.values()),
        react: {
          useSuspense: false
        },
        interpolation: {
          escapeValue: false
        }
      })
      .use(initReactI18next)
    await i18n.init()
    this.i18n = i18n
    this.onLocaleChanged()
  }

  get locale(): Intl.Locale {
    if (this._locale === null) {
      throw new Error("locale not set")
    }

    return this._locale
  }

  set locale(newLocale: Intl.Locale | null) {
    if (newLocale === null) {
      throw new Error(`this new locale ${newLocale} can't be set`)
    }
    this._locale = newLocale
  }

  private determineLocale(
    force: string | null | undefined,
    user: string,
    fallback: string
  ): Intl.Locale | null {
    const tags = []
    if (force) {
      tags.push(force)
    } else if (user) {
      tags.push(user)
    }
    for (const tag of tags) {
      const locale = getLocale(tag)
      if (locale && this.hasMatchingTranslation(locale)) {
        return locale
      }
    }
    return getLocale(fallback)
  }

  get translationLocales(): Set<Intl.Locale> {
    if (!this._translationLocales) {
      this._translationLocales = new Set(
        SUPPORTED_LANGUAGES.map((x) => getLocale(x.code)).filter(
          (x) => x
        ) as Intl.Locale[]
      )
    }
    return this._translationLocales
  }

  private hasMatchingTranslation(locale: Intl.Locale) {
    return Array.from(this.translationLocales.values()).some(
      (translation) =>
        locale.language === translation.language &&
        (locale.region === translation.region || !translation.region)
    )
  }

  get translationLanguages(): Set<string> {
    if (!this._translationLanguages) {
      this._translationLanguages = new Set(
        Array.from(this.translationLocales.values())
          .map((x) => x.language || "")
          .filter((x) => x)
      )
    }
    return this._translationLanguages
  }

  private onLocaleChanged = (currency?: string | null) => {
    if (!this.i18n || !this.locale) {
      console.error(
        "LocaleService.updateLocale() called before LocaleService.start()"
      )
      return
    }
    Settings.defaultLocale = this.locale.baseName
    this.dispatch(
      setI18N({
        locale: this.locale.baseName,
        currency: currency
      })
    )
  }

  public handleLanguageChange = async (
    lang: string,
    currency?: string | null
  ) => {
    if (this.i18n) {
      await this.i18n.changeLanguage(lang)
      this.locale = getLocale(lang)
      this.onLocaleChanged(currency)
    }
  }
}
