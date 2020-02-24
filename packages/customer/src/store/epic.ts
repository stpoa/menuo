import { combineEpics, Epic } from 'redux-observable'
import { isActionOf } from 'typesafe-actions'
import { map, filter, mergeMap } from 'rxjs/operators'

import { menuGetEpic, menuRefetchEpic } from './menu/epic'
import { tableSetEpic } from './table/epic'
import { restaurantSetEpic } from './restaurant/epic'
import { localeSetActiveLanguageEpic, localeInitEpic } from './user/locale/epic'
import * as actions from './actions'

const initEpic: Epic = action$ =>
  action$.pipe(
    filter(isActionOf(actions.init)),
    mergeMap(() => [actions.localeInit()]),
  )

export const rootEpic = combineEpics(
  menuGetEpic,
  menuRefetchEpic,
  tableSetEpic,
  restaurantSetEpic,
  localeInitEpic,
  localeSetActiveLanguageEpic,
  initEpic,
)
