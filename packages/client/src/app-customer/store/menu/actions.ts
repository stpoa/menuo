import { createStandardAction } from 'typesafe-actions'

type Restaurant = string
export const menuGetRequest = createStandardAction('MENU / GET_REQUEST')<
  Restaurant
>()

type Dishes = any[]
export const menuGetReceive = createStandardAction('MENU / GET_RECEIVE')<
  Dishes
>()

export const menuGetFailure = createStandardAction('MENU / GET_FAILIRE')<
  Error
>()
