import { createStandardAction } from 'typesafe-actions'
import { RestaurantConfig } from '@menuo/shared'

export const configGetRequest = createStandardAction('CONFIG / GET_REQUEST')()

export const configGetReceive = createStandardAction('CONFIG / GET_RECEIVE')<
  RestaurantConfig
>()

export const configGetFailure = createStandardAction('CONFIG / GET_FAILIRE')<
  Error
>()
