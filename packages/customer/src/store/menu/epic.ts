import { Epic, StateObservable } from 'redux-observable'
import { filter, map, mergeMap, catchError, take } from 'rxjs/operators'
import { isActionOf } from 'typesafe-actions'
import { of, from, fromEvent } from 'rxjs'

import { getRestaurantDishes } from './api'
import * as actions from './actions'
import { RootState } from '../store'

export const menuGetEpic: Epic = (
  action$,
  state$: StateObservable<RootState>,
) =>
  action$.pipe(
    filter(isActionOf(actions.menuGetRequest)),
    mergeMap(() =>
      from(getRestaurantDishes({ restaurant: state$.value.restaurant })).pipe(
        map(actions.menuGetReceive),
        catchError((error: Error) => of(actions.menuGetFailure(error))),
      ),
    ),
  )

export const menuRefetchEpic: Epic = action$ =>
  action$.pipe(
    filter(isActionOf(actions.menuGetRequest)),
    take(1),
    mergeMap(() =>
      fromEvent(navigator.serviceWorker, 'message').pipe(
        map(() => actions.menuGetRequest()),
        catchError((error: Error) => of(actions.menuGetFailure(error))),
      ),
    ),
  )
