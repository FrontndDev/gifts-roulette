import type { XiorInstance } from 'xior'
import xior from 'xior'
import { initData } from '@telegram-apps/sdk-react'

export const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL

export const api: XiorInstance = xior.create({
  baseURL,
})

export const getToken = (): string | null => {
  if (typeof window === 'undefined') return null // SSR
  try {
    const raw = initData.raw()
    if (raw && raw.length > 0) return `tma ${raw}`
  } catch {
    // запасной путь: из Telegram.WebApp
    const raw = (window as any)?.Telegram?.WebApp?.initData as
      | string
      | undefined
    if (raw && raw.length > 0) return `tma ${raw}`
  }
  return null
}

api.interceptors.request.use((request) => {
  request.headers.Authorization = `${getToken()}`
  return request
})
