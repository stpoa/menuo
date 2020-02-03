import { Epic } from 'redux-observable'
import { filter, map, mergeMap, catchError } from 'rxjs/operators'
import { isOfType } from 'typesafe-actions'
import { of, from } from 'rxjs'

import { listRestaurantDishes } from '../../pages/Menu/Menu.api'
import * as actions from './actions'

export const menuEpic: Epic = action$ =>
  action$.pipe(
    filter(isOfType(actions.getMenuRequest.type)),
    mergeMap(({ payload: { restaurant } }) =>
      from(listRestaurantDishes({ restaurant })).pipe(
        map(response => {
          console.log(response)
          return actions.getMenuReceive(response)
        }),
        catchError(error => of(actions.getMenuFailure(error))),
      ),
    ),
  )
