import { createAction } from '@reduxjs/toolkit'

export const getMenuRequest = createAction('GET_MENU', (restaurant: any) => ({
  payload: { restaurant },
}))

export const getMenuReceive = createAction(
  'GET_MENU_SUCCESS',
  (dishes: any) => ({
    payload: { dishes },
  }),
)

export const getMenuFailure = createAction<any>('GET_MENU_FAILIRE')
