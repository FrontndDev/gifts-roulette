import { createEffect } from 'effector'
import { XiorError } from 'xior'
import { api } from '@/shared/api'

export const getSessionFx = createEffect<void, any, XiorError>(async () =>
  api.get(`/user`).then((response) => response.data),
)
