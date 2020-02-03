import { Epic } from 'redux-observable'
import { filter, map, mergeMap, catchError } from 'rxjs/operators'
import { isOfType } from 'typesafe-actions'
import { of, from } from 'rxjs'

import { listRestaurantDishes } from './api'
import * as actions from './actions'

export const menuEpic: Epic = action$ =>
  action$.pipe(
    filter(isOfType(actions.getMenuRequest.type)),
    mergeMap(({ payload: { restaurant } }) =>
      from(listRestaurantDishes({ restaurant })).pipe(
        map(actions.getMenuReceive),
        catchError(error => of(actions.getMenuFailure(error))),
      ),
    ),
  )
