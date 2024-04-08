import { useAppSelector } from "../../store"
export const useSelectI18N = () => useAppSelector((state) => state.i18n)
export const useSelectLocale = () =>
  useAppSelector((state) => state.i18n.locale)
