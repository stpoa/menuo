import { Epic, StateObservable } from 'redux-observable'
import { filter, map } from 'rxjs/operators'
import { isActionOf } from 'typesafe-actions'
import queryString from 'query-string'

import * as actions from './actions'
import { RootState } from '../store'

export const tableSetEpic: Epic = (
  action$,
  state$: StateObservable<RootState>,
) =>
  action$.pipe(
    filter(isActionOf(actions.tableGet)),
    map(() => {
      const { search, pathname } = state$.value.router.location
      const parsedQuery = queryString.parse(search)
      const parsedPath = pathname.slice(1)

      return actions.tableSet({
        name: String(parsedQuery.table),
        _id: '',
        restaurant: parsedPath,
        status: 'new',
      })
    }),
  )
