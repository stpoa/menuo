import { Epic } from 'redux-observable'
import { filter, map } from 'rxjs/operators'
import { isActionOf } from 'typesafe-actions'

import * as actions from './actions'

export const userLanguageSetEpic: Epic = action$ =>
  action$.pipe(
    filter(isActionOf(actions.userLanguageGet)),
    map(() => {
      const language =
        (navigator.languages && navigator.languages[0]) ||
        navigator.language ||
        ((navigator as any) as { userLanguage: string }).userLanguage

      const languageWithoutRegionCode = language.toLowerCase().split(/[_-]+/)[0]

      return actions.userLanguageSet(languageWithoutRegionCode || 'en')
    }),
  )
