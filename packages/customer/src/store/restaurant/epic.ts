import { Epic, StateObservable } from 'redux-observable'
import { filter, map } from 'rxjs/operators'
import { isActionOf } from 'typesafe-actions'

import * as actions from './actions'
import { RootState } from '../store'

export const restaurantSetEpic: Epic = (
  action$,
  state$: StateObservable<RootState>,
) =>
  action$.pipe(
    filter(isActionOf(actions.restaurantGet)),
    map(() => {
      const { pathname } = state$.value.router.location
      const parsedPath = pathname.slice(1)

      return actions.restaurantSet(parsedPath)
    }),
  )
