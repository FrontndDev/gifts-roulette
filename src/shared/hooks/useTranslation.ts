import { useUnit } from 'effector-react'
import { i18nModel, getTranslation } from '@/shared/i18n'

export function useTranslation() {
  const [translations, locale, changeLocale] = useUnit([
    i18nModel.$translations,
    i18nModel.$locale,
    i18nModel.changeLocale,
  ])

  const t = (path: string, params?: Record<string, string | number>) => {
    return getTranslation(translations, path, params)
  }

  return {
    t,
    locale,
    changeLocale,
  }
}
