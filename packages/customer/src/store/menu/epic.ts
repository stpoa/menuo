import { Epic } from 'redux-observable'
import { filter, map, mergeMap, catchError, take } from 'rxjs/operators'
import { isActionOf } from 'typesafe-actions'
import { of, from, fromEvent } from 'rxjs'

import { getRestaurantDishes } from './api'
import * as actions from './actions'

export const menuGetEpic: Epic = action$ =>
  action$.pipe(
    filter(isActionOf(actions.menuGetRequest)),
    mergeMap(action =>
      from(getRestaurantDishes({ restaurant: action.payload })).pipe(
        map(actions.menuGetReceive),
        catchError((error: Error) => of(actions.menuGetFailure(error))),
      ),
    ),
  )

export const menuRefetchEpic: Epic = action$ =>
  action$.pipe(
    filter(isActionOf(actions.menuGetRequest)),
    take(1),
    mergeMap(action =>
      fromEvent(navigator.serviceWorker, 'message').pipe(
        map(() => actions.menuGetRequest(action.payload)),
        catchError((error: Error) => of(actions.menuGetFailure(error))),
      ),
    ),
  )
