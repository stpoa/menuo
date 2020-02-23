import { Epic } from 'redux-observable'
import { filter, map } from 'rxjs/operators'
import { isActionOf } from 'typesafe-actions'

import * as actions from './actions'
import { getLanguageFromBrowser } from './api'

export const userLanguageSetEpic: Epic = action$ =>
  action$.pipe(
    filter(isActionOf(actions.userLanguageGet)),
    map(() => {
      const lang = getLanguageFromBrowser()
      const language = lang === 'pl' ? 'pl' : 'en'

      return actions.userLanguageSet(language)
    }),
  )
