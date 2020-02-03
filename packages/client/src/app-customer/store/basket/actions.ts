import { createAction } from '@reduxjs/toolkit'

export const basketAdd = createAction('BASKET_ADD', basketEntry => ({
  payload: { basketEntry },
}))

export const basketRemove = createAction('BASKET_REMOVE', basketEntry => ({
  payload: { basketEntry },
}))

export const basketToggleVariant = createAction(
  'BASKET_TOGGLE_VARIANT',
  basketEntry => ({
    payload: { basketEntry },
  }),
)

export const basketToggleDish = createAction(
  'BASKET_TOGGLE_DISH',
  basketEntry => ({
    payload: { basketEntry },
  }),
)

export const basketClear = createAction('BASKET_CLEAR')
