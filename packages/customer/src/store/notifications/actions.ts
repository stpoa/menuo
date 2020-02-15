import { createStandardAction } from 'typesafe-actions'

export const notificationsSubscribeRequest = createStandardAction(
  'NOTIFICATIONS / SUBSCRIBE_REQUEST',
)()

type Subscription = any
export const notificationsSubscribeSuccess = createStandardAction(
  'NOTIFICATIONS / SUBSCRIBE_SUCCESS',
)<Subscription>()

export const notificationsSubscribeFailure = createStandardAction(
  'NOTIFICATIONS / SUBSCRIBE_FAILURE',
)<Error>()
