import { twMerge } from 'tailwind-merge'
import { type ClassValue, clsx } from 'clsx'

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs))
}

export function getPaddingClasses(platform: string) {
  const isMacOrDesktop = ['macos', 'tdesktop', 'web'].includes(platform)
  return {
    main: cn('mt-5 px-4 pb-[87px]', isMacOrDesktop && 'mt-4 pb-[72px]'),
    toast: isMacOrDesktop ? '0px' : '90px',
    appPlatform: (['macos', 'ios'].includes(platform) ? 'ios' : 'base') as
      | 'ios'
      | 'base'
      | undefined,
  }
}

export const atom = <T>(factory: () => T) => factory()
