import {
  initData,
  useLaunchParams,
  useSignal,
  viewport,
} from '@telegram-apps/sdk-react'
import { cn } from '@/shared/libs'
import { useUnit } from 'effector-react'
import { sessionModel } from '@/entities/session'
import { Icons } from '@/shared/ui/icons'
import { usePathname } from 'next/navigation'
import { BalanceCounter } from '@/shared/ui/balance-counter'
import { router } from 'next/client'
import { BalanceWithdrawal } from '@/widgets/home/balance-withdrawal'
import { useState } from 'react'

export const Header = () => {
  const lp = useLaunchParams()
  const initUser = useSignal(initData.user)
  const pathname = usePathname()
  const [showWithdrawal, setShowWithdrawal] = useState(false)

  const [session] = useUnit([sessionModel.$session])

  const containerClass = cn(
    'absolute top-3 transition-colors relative z-20 px-[32px] pb-3',
  )

  const getPaddingTop = () => {
    if (lp.tgWebAppPlatform === 'macos' || lp.tgWebAppPlatform === 'tdesktop') {
      return 20
    }

    if (lp.tgWebAppPlatform === 'ios') {
      return viewport.isFullscreen() ? 106 : 20
    }

    if (lp.tgWebAppPlatform === 'android') {
      return viewport.isFullscreen() ? 75 : 20
    }

    return 20
  }

  const paddingTop = getPaddingTop()

  if (!['/', '/craft'].includes(pathname)) return null

  return (
    <div className={containerClass} style={{ paddingTop }}>
      <header className="flex max-h-[28px] flex-row items-center justify-between">
        <BalanceCounter
          className="cursor-pointer"
          count={11}
          onClick={() => setShowWithdrawal(true)}
        />
        {pathname === '/' && (
          <Icons.Clock
            className="cursor-pointer"
            onClick={() => router.push('/history-games')}
          />
        )}

        {showWithdrawal && (
          <BalanceWithdrawal setShowWithdrawal={setShowWithdrawal} />
        )}
      </header>
    </div>
  )
}
