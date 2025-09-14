import { atom } from '@/shared/libs'
import { createEvent, createStore, sample } from 'effector'
import { persist } from 'effector-storage/local'
import { en } from './locales/en'
import { ru } from './locales/ru'
import { createGate } from 'effector-react'

export type Locale = 'en' | 'ru'

const locales = { en, ru }

const detectBrowserLanguage = (): Locale => {
  if (typeof window === 'undefined') return 'ru'

  const browserLang = navigator.language.toLowerCase()
  if (browserLang.startsWith('ru')) return 'ru'
  return 'en'
}

export const i18nModel = atom(() => {
  const i18Gate = createGate()
  const changeLocale = createEvent<Locale>()

  const $locale = createStore<Locale>('ru').on(
    changeLocale,
    (_, locale) => locale,
  )

  const $translations = $locale.map((locale) => locales[locale])

  persist({
    pickup: i18Gate.open,
    store: $locale,
    key: 'app-locale',
    def: detectBrowserLanguage(),
  })

  return {
    i18Gate,
    $locale,
    $translations,
    changeLocale,
  }
})

export function getTranslation(
  translations: any,
  path: string,
  params?: Record<string, string | number>,
): string {
  const keys = path.split('.')
  let result: any = translations

  for (const key of keys) {
    result = result?.[key]
  }

  if (typeof result !== 'string') {
    return path // Return path if translation not found
  }

  if (params) {
    return Object.entries(params).reduce(
      (str, [key, value]) => str.replace(`{${key}}`, String(value)),
      result,
    )
  }

  return result
}
