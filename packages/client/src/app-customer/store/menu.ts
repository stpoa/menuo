import { createAction, createReducer, getType } from '@reduxjs/toolkit'
import { Epic } from 'redux-observable'
import { filter, map, mergeMap, catchError } from 'rxjs/operators'
import { isOfType } from 'typesafe-actions'
import { of, from } from 'rxjs'
import { listRestaurantDishes } from '../pages/Menu/Menu.api'

export const actions = {
  getMenuRequest: createAction('GET_MENU', (restaurant: any) => ({
    payload: { restaurant },
  })),
  getMenuReceive: createAction('GET_MENU_SUCCESS', (dishes: any) => ({
    payload: { dishes },
  })),
  getMenuFailure: createAction<any>('GET_MENU_FAILIRE'),
}

const initialState = { dishes: [] }

export const menuReducer = createReducer(initialState, {
  [actions.getMenuRequest.type]: state => state,
  [actions.getMenuReceive.type]: (state, action) => {
    console.log({ action })
    return {
      ...state,
      dishes: [...action.payload.dishes] as any,
    }
  },
  [actions.getMenuFailure.type]: state => state,
})

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
