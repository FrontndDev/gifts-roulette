import { useGate } from 'effector-react'
import type { NextPage } from 'next'
import type { AppProps } from 'next/app'
import { Inter, Press_Start_2P } from 'next/font/google'
import { useRouter } from 'next/router'
import { ReactElement, ReactNode, useEffect } from 'react'

import { navigationModel } from '@/shared/navigation'
import { withProviders } from './providers'
import { Layout } from '@/widgets/layout'
import { init } from '@/shared/init'
import { i18nModel } from '@/shared/i18n'
import { cn } from '@/shared/libs'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

const pressStart2P = Press_Start_2P({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-press-start-2p',
})

export type NextPageWithLayout<P = NonNullable<unknown>, IP = P> = NextPage<
  P,
  IP
> & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

const App = ({ Component, pageProps }: AppPropsWithLayout) => {
  const router = useRouter()

  useEffect(() => {
    init({ debug: true, eruda: true, mockForMacOS: false })
  }, [])

  useGate(navigationModel.RouterGate, { router })
  useGate(i18nModel.i18Gate)

  return (
    <div className={cn(inter.className, pressStart2P.variable)}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </div>
  )
}

export default withProviders(App)
