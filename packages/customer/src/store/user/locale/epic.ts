import { Epic } from 'redux-observable'
import { filter, mergeMap, skip } from 'rxjs/operators'
import { isOfType, isActionOf } from 'typesafe-actions'
import { initialize, setActiveLanguage } from 'react-localize-redux'
import { renderToStaticMarkup } from 'react-dom/server'

import * as actions from './actions'
import { getLanguageFromBrowser, getTranslations } from './api'

import * as allActions from '../../actions'

export const localeSetActiveLanguageEpic: Epic = action$ =>
  action$.pipe(
    filter(isOfType('@@localize/SET_ACTIVE_LANGUAGE')),
    skip(1),
    mergeMap(() => [allActions.menuGetRequest()]),
  )

export const localeInitEpic: Epic = action$ =>
  action$.pipe(
    filter(isActionOf(actions.localeInit)),
    mergeMap(() => {
      const languages = ['en', 'pl']
      const defaultLanguage = 'en'
      const activeLanguage = getLanguageFromBrowser() === 'pl' ? 'pl' : 'en'

      return [
        initialize({
          languages,
          translation: getTranslations(),
          options: { defaultLanguage, renderToStaticMarkup },
        }),
        setActiveLanguage(activeLanguage),
      ]
    }),
  )
