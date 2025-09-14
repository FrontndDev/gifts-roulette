import { atom } from '@/shared/libs'
import { restore, createEffect, createEvent, createStore } from 'effector'
import { getSessionFx } from '@/shared/api/requests'

export const sessionModel = atom(() => {
  const getSession = createEffect(getSessionFx)
  const $session = restore(getSession, null)

  return {
    $session,
    getSession,
  }
})
