import { createReducer } from '@reduxjs/toolkit'
import * as actions from './actions'

const initialState = { dishes: [] }

export const menuReducer = createReducer(initialState, {
  [actions.getMenuRequest.type]: state => state,
  [actions.getMenuReceive.type]: (state, action) => ({
    ...state,
    dishes: [...action.payload.dishes] as any,
  }),
  [actions.getMenuFailure.type]: state => state,
})
