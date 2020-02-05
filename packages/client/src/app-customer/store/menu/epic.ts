import { Epic } from 'redux-observable'
import { filter, map, mergeMap, catchError } from 'rxjs/operators'
import { isActionOf } from 'typesafe-actions'
import { of, from } from 'rxjs'

import { listRestaurantDishes } from './api'
import * as actions from './actions'

export const menuEpic: Epic = action$ =>
  action$.pipe(
    filter(isActionOf(actions.menuGetRequest)),
    mergeMap(action =>
      from(listRestaurantDishes({ restaurant: action.payload })).pipe(
        map(actions.menuGetReceive),
        catchError((error: Error) => of(actions.menuGetFailure(error))),
      ),
    ),
  )
