import type { ParsedUrlQuery } from 'node:querystring'

import { attach, createStore } from 'effector'
import { createGate } from 'effector-react'
import type { NextRouter } from 'next/router'
import { reshape } from 'patronum'
import { atom } from '@/shared/libs'

export const navigationModel = atom(() => {
  const RouterGate = createGate<{ router: NextRouter }>()

  const $router = createStore<NextRouter | null>(null, {
    serialize: 'ignore',
  })
    .on(RouterGate.state, (_, { router }) => router)
    .reset(RouterGate.close)

  const { $query, $asPath, $pathname } = reshape({
    source: $router,
    shape: {
      $query: (router) => router?.query,
      $asPath: (router) => router?.asPath,
      $pathname: (router) => router?.pathname,
    },
  })

  const pushFx = attach({
    source: $router,
    effect: (router, url: string) => router?.push(url),
  })

  const pushQueryFx = attach({
    source: $router,
    effect: (router, query: ParsedUrlQuery | null) => {
      if (router) {
        const { ...routerQuery } = router.query

        router?.push({ query: { ...routerQuery, ...query } })
      }
    },
  })

  return {
    RouterGate,
    $router,
    $query,
    $asPath,
    $pathname,
    pushFx,
    pushQueryFx,
  }
})
