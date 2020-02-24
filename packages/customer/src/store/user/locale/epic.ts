import { Epic } from 'redux-observable'
import { filter, mergeMap, map } from 'rxjs/operators'
import { isOfType, isActionOf } from 'typesafe-actions'
import { initialize } from 'react-localize-redux'
import { renderToStaticMarkup } from 'react-dom/server'

import * as actions from './actions'
import { getLanguageFromBrowser } from './api'

import * as allActions from '../../actions'

export const localeSetActiveLanguageEpic: Epic = action$ =>
  action$.pipe(
    filter(isOfType('@@localize/SET_ACTIVE_LANGUAGE')),
    mergeMap(() => [allActions.menuGetRequest()]),
  )

enum AppLanguage {
  pl = 'pl',
  en = 'en',
}

export const localeInitEpic: Epic = action$ =>
  action$.pipe(
    filter(isActionOf(actions.localeInit)),
    map(() => {
      const language = getLanguageFromBrowser()
      const defaultLanguage = language === 'pl' ? 'pl' : 'en'

      const translation = {
        callWaiter: ['Call a waiter', 'Zawołaj kelnera'],
        order: ['Order', 'Zamów'],
        searchPlaceholderContent: [
          'Search in dishes and descriptions',
          'Wyszukaj w daniach lub w opisach',
        ],
        homePageUrlContent: ['https://menuo.app/en', 'https://menuo.app'],
        aboutUs: ['About us', 'O nas'],
      }

      return initialize({
        languages: ['en', 'pl'],
        translation,
        options: { defaultLanguage, renderToStaticMarkup },
      })
    }),
  )
