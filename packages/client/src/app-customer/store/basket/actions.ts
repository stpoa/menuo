import { createAction } from '@reduxjs/toolkit'

export const basketAdd = createAction('BASKET / ADD', basketEntry => ({
  payload: { basketEntry },
}))

export const basketRemove = createAction('BASKET / REMOVE', basketEntry => ({
  payload: { basketEntry },
}))

export const basketToggleVariant = createAction(
  'BASKET / TOGGLE_VARIANT',
  basketEntry => ({
    payload: { basketEntry },
  }),
)

export const basketToggleDish = createAction(
  'BASKET / TOGGLE_DISH',
  basketEntry => ({
    payload: { basketEntry },
  }),
)

export const basketClear = createAction('BASKET / CLEAR')
