import { Epic, StateObservable } from 'redux-observable'
import { filter, map, mergeMap, catchError, take } from 'rxjs/operators'
import { isActionOf } from 'typesafe-actions'
import { of, from, fromEvent } from 'rxjs'

import { getRestaurantConifig } from './api'
import * as actions from './actions'
import { RootState } from '../store'

export const configGetEpic: Epic = (
  action$,
  state$: StateObservable<RootState>,
) =>
  action$.pipe(
    filter(isActionOf(actions.configGetRequest)),
    mergeMap(() =>
      from(getRestaurantConifig({ restaurant: state$.value.restaurant })).pipe(
        map(actions.configGetReceive),
        catchError((error: Error) => of(actions.configGetFailure(error))),
      ),
    ),
  )

export const configRefetchEpic: Epic = action$ =>
  action$.pipe(
    filter(isActionOf(actions.configGetRequest)),
    take(1),
    mergeMap(() =>
      fromEvent(navigator.serviceWorker, 'message').pipe(
        map(() => actions.configGetRequest()),
        catchError((error: Error) => of(actions.configGetFailure(error))),
      ),
    ),
  )
