import { createStandardAction } from 'typesafe-actions'

export const userLanguageGet = createStandardAction('USER / LANGUAGE / GET')()

type UserLanguage = 'en' | 'pl'
export const userLanguageSet = createStandardAction('USER / LANGUAGE / SET')<
  UserLanguage
>()
