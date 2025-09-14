import { hapticFeedback, useLaunchParams } from '@telegram-apps/sdk-react'
import { cn } from '@/shared/libs'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Icons } from '@/shared/ui/icons'

export const TabBar = () => {
  const lp = useLaunchParams()
  const pathname = usePathname()

  const tabs = [
    {
      href: '/',
      icon: Icons.Sword,
      label: 'PVP',
      isActiveHref: '/history-games',
    },
    {
      href: '/craft',
      icon: Icons.ColorRoulette,
      label: 'Крафт',
    },
    { href: '/my-gifts', icon: Icons.Gift, label: 'Мои гифты' },
    { href: '/profile', icon: Icons.Diamond, label: 'Заработок' },
  ] as const

  return (
    <footer
      className={cn(
        'flex w-full flex-row items-center justify-between px-[37px] py-3.5 transition-colors',
        lp.tgWebAppPlatform === 'ios' && 'pt-3.5 !pb-7',
      )}
    >
      {tabs.map(({ href, icon: Icon, label, isActiveHref }) => {
        const isActive =
          href === '/'
            ? pathname === '/' || pathname === isActiveHref
            : pathname?.startsWith(href)

        return (
          <Link
            onClick={() => hapticFeedback.selectionChanged()}
            key={href}
            href={href}
            className={cn('group flex w-[58.54px] flex-col items-center gap-1')}
          >
            <Icon
              className={cn(
                'size-[38px] transition-all',
                isActive ? '!stroke-primary' : 'stroke-[#6E6E6E]',
              )}
            />
            <span
              className={cn(
                'text-[11px] font-normal transition-all',
                isActive ? '!text-primary' : 'text-[#6E6E6E]',
              )}
            >
              {label}
            </span>
          </Link>
        )
      })}
    </footer>
  )
}
