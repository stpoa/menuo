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
        payByCash: ['Pay by cash', 'Płatność gotówką'],
        payByCard: ['Pay by card', 'Płatność kartą'],
        other: ['Other', 'Inne'],
        orderConfirmContent: [
          'Do you want to order entries below?',
          'Czy chcesz zamówić poniższe?',
        ],
        back: ['back', 'powrót'],
        orderSentTitleContent: ['Order sent', 'Zamówienie wysłane!'],
        orderSentSubTitleContent: [
          'Your order has been sent',
          'Twoje zamówienie zostało wysłane!',
        ],
        orderSentContent: [
          'Remember that at any moment you can make another order or call a waiter. Already ordered dishes can be seen by clicking an icon in upper right screen corner.',
          'Pamiętaj, że w każdej chwili możesz złożyć kolejne zamówienie lub zawołać kelnera. Zamówione wcześniej dania możesz sprawdzić klikając ikonke w prawym, górnym rogu.',
        ],
      }

      return initialize({
        languages: ['en', 'pl'],
        translation,
        options: { defaultLanguage, renderToStaticMarkup },
      })
    }),
  )
