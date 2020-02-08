import { createReducer } from '@reduxjs/toolkit'
import * as actions from './actions'

interface BasketEntry {
  dish: string
  variant: string
  _id: string
}

const initialState: BasketEntry[] = []

const isEntryEqual = (a: BasketEntry) => (b: BasketEntry) =>
  a.dish === b.dish && a.variant === b.variant
const isEntryNotEqual = (a: BasketEntry) => (b: BasketEntry) =>
  a.dish !== b.dish || a.variant !== b.variant
const isEntryDishNotEqual = (a: BasketEntry) => (b: BasketEntry) =>
  a.dish !== b.dish

export const basketReducer = createReducer(initialState, {
  [actions.basketAdd.type]: (state, action) => [
    ...state,
    action.payload.basketEntry,
  ],
  [actions.basketRemove.type]: (state, action) => {
    const index = state.findIndex(isEntryEqual(action.payload.basketEntry))
    state.splice(index, 1)
  },
  [actions.basketClear.type]: () => {
    return []
  },
  [actions.basketToggleVariant.type]: (state, action) => {
    const found = state.find(isEntryEqual(action.payload.basketEntry))
    return found
      ? state.filter(isEntryNotEqual(action.payload.basketEntry))
      : [...state, action.payload.basketEntry]
  },
  [actions.basketToggleDish.type]: (state, action) => {
    const found = state.find(
      entry => entry.dish === action.payload.basketEntry.dish,
    )
    return found
      ? state.filter(isEntryDishNotEqual(action.payload.basketEntry))
      : [...state, action.payload.basketEntry]
  },
})
