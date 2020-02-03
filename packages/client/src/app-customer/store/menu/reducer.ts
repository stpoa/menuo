import { createReducer } from '@reduxjs/toolkit'
import * as actions from './actions'

const initialState = { dishes: [], isFetching: false }

export const menuReducer = createReducer(initialState, {
  [actions.getMenuRequest.type]: state => ({ ...state, isFetching: true }),
  [actions.getMenuReceive.type]: (state, action) => ({
    ...state,
    dishes: [...action.payload.dishes] as any,
    isFetching: false,
  }),
  [actions.getMenuFailure.type]: (state, action) => ({
    ...state,
    error: action.payload.error,
    isFetching: false,
  }),
})
