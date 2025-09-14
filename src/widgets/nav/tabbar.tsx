import { hapticFeedback, useLaunchParams } from '@telegram-apps/sdk-react'
import { cn } from '@/shared/libs'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Icons } from '@/shared/ui/icons'
import { FC } from 'react'
import { IconProps } from '@expo/vector-icons/build/createIconSet'

type Tab = {
  href: string
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>
  label: string
  isActiveHref?: string
  classIcon: string
  classText: string
}

export const TabBar = () => {
  const lp = useLaunchParams()
  const pathname = usePathname()

  const tabs: Tab[] = [
    {
      href: '/',
      icon: Icons.Sword,
      label: 'PVP',
      isActiveHref: '/history-games',
      classIcon: '!stroke-primary',
      classText: '!text-primary',
    },
    {
      href: '/craft',
      icon: Icons.ColorRoulette,
      label: 'Крафт',
      classIcon: '!stroke-[#E94DBB]',
      classText: '!text-[#E94DBB]',
    },
    {
      href: '/my-gifts',
      icon: Icons.Gift,
      label: 'Мои гифты',
      classIcon: '!stroke-[#03A7FF]',
      classText: '!text-[#03A7FF]',
    },
    {
      href: '/profile',
      icon: Icons.Diamond,
      label: 'Заработок',
      classIcon: '!stroke-[#34BFFF]',
      classText: '!text-[#34BFFF]',
    },
  ]

  return (
    <footer
      className={cn(
        'flex w-full flex-row items-center justify-between px-[37px] py-3.5 transition-colors',
        lp.tgWebAppPlatform === 'ios' && 'pt-3.5 !pb-7',
      )}
    >
      {tabs.map(
        ({ href, icon: Icon, label, isActiveHref, classIcon, classText }) => {
          const isActive =
            href === '/'
              ? pathname === '/' || pathname === isActiveHref
              : pathname?.startsWith(href)

          return (
            <Link
              onClick={() => hapticFeedback.selectionChanged()}
              key={href}
              href={href}
              className={cn(
                'group flex w-[58.54px] flex-col items-center gap-1',
              )}
            >
              <Icon
                className={cn(
                  'size-[38px] transition-all',
                  isActive ? classIcon : 'stroke-[#6E6E6E]',
                )}
              />
              <span
                className={cn(
                  'text-[11px] font-normal transition-all',
                  isActive ? classText : 'text-[#6E6E6E]',
                )}
              >
                {label}
              </span>
            </Link>
          )
        },
      )}
    </footer>
  )
}
