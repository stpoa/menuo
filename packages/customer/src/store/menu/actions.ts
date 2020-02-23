import { createStandardAction } from 'typesafe-actions'

export const menuGetRequest = createStandardAction('MENU / GET_REQUEST')()

type Dishes = any[]
export const menuGetReceive = createStandardAction('MENU / GET_RECEIVE')<
  Dishes
>()

export const menuGetFailure = createStandardAction('MENU / GET_FAILIRE')<
  Error
>()

export const menuFilter = createStandardAction('MENU / FILTER')<string>()
