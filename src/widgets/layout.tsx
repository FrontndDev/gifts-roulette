import Image from 'next/image'
import { type PropsWithChildren, useEffect, useRef } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'

import { AppRoot, FixedLayout } from '@telegram-apps/telegram-ui'
import { TonConnectUIProvider } from '@tonconnect/ui-react'
import { useLaunchParams, viewport } from '@telegram-apps/sdk-react'
import { useUnit } from 'effector-react'

import { useDidMount } from '@/shared/hooks/useDidMount'
import { Loader } from '@/shared/ui/loader'
import { Header } from '@/widgets/nav/header'
import { TabBar } from '@/widgets/nav/tabbar'
import { cn, getPaddingClasses } from '@/shared/libs'
import { Toaster } from 'sonner'
import { sessionModel } from '@/entities/session'
import { usePathname } from 'next/navigation'

function RootInner({ children }: PropsWithChildren) {
  const lp = useLaunchParams()
  const tgWebAppStartParam = lp?.tgWebAppStartParam
  const platform = lp?.tgWebAppPlatform

  const { main, toast, appPlatform } = getPaddingClasses(platform)
  const router = useRouter()
  const pathname = usePathname()
  const hasRedirected = useRef(false)

  const [getSession] = useUnit([sessionModel.getSession])

  useEffect(() => {
    getSession()
  }, [getSession])

  useEffect(() => {
    if (!router.isReady) return

    const start = tgWebAppStartParam?.trim()
    if (!start) return

    const uuidRegex =
      /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i
    if (!uuidRegex.test(start)) {
      console.log('⚠️ Invalid startapp parameter format:', start)
      return
    }

    const target = `/raffle/${start}`
    const here = router.asPath

    if (here === target) {
      return
    }

    const key = `redirected:${start}`
    let alreadyRedirected = false

    try {
      if (typeof window !== 'undefined') {
        alreadyRedirected = window.sessionStorage.getItem(key) === '1'
      }
    } catch {}

    if (hasRedirected.current || alreadyRedirected) {
      return
    }

    hasRedirected.current = true
    try {
      if (typeof window !== 'undefined') {
        window.sessionStorage.setItem(key, '1')
      }
    } catch {}

    setTimeout(() => {
      console.log('🎰 Redirecting to', target, 'from', here)
      router.replace(target).catch((e) => {
        console.error('Redirect failed:', e)
        hasRedirected.current = false
      })
    }, 0)
  }, [router.isReady, router.asPath, tgWebAppStartParam, router])

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

  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no"
        />
      </Head>

      <Image
        alt={'bg'}
        className={'object-cover object-center transition-all'}
        src={
          pathname === '/'
            ? '/background-pvp.svg'
            : pathname === '/my-gifts'
              ? 'background-gifts.svg'
              : pathname === '/profile'
                ? 'background-profile.svg'
                : 'background-craft.svg'
        }
        fill
      />

      <TonConnectUIProvider manifestUrl="https://raw.githubusercontent.com/euorphans/test/refs/heads/main/tonconnect-manifest.json">
        <AppRoot
          className={'relative z-10 !bg-transparent'}
          appearance="dark"
          platform={appPlatform}
        >
          <Toaster
            position="top-center"
            toastOptions={{
              unstyled: true,
              classNames: {
                toast:
                  'group toast group-[.toaster]:bg-transparent group-[.toaster]:border-none group-[.toaster]:shadow-none',
                description: 'group-[.toast]:text-muted-foreground',
                actionButton:
                  'group-[.toast]:bg-primary group-[.toast]:text-primary-foreground',
                cancelButton:
                  'group-[.toast]:bg-muted group-[.toast]:text-muted-foreground',
              },
            }}
            style={{ marginTop: toast }}
          />

          <Header />
          <main style={{ paddingTop }} className={cn(main, 'px-[7.45vw]')}>
            {children}
          </main>

          <FixedLayout
            className="z-10 flex w-full flex-col items-center gap-2"
            vertical="bottom"
          >
            <TabBar />
          </FixedLayout>
        </AppRoot>
      </TonConnectUIProvider>
    </>
  )
}

export function Layout(props: PropsWithChildren) {
  return useDidMount() ? (
    <RootInner {...props} />
  ) : (
    <div className="flex h-screen w-screen items-center justify-center text-white">
      <Loader variant="ring" className="size-10" />
    </div>
  )
}
