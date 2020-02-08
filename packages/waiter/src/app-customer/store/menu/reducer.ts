import * as actions from './actions'
import { createReducer } from 'typesafe-actions'

const initialState = { dishes: [], isFetching: false }

export const menuReducer = createReducer(initialState)
  .handleAction(actions.menuGetRequest, state => ({
    ...state,
    isFetching: true,
  }))
  .handleAction(actions.menuGetReceive, (state, action) => ({
    ...state,
    dishes: action.payload,
    isFetching: false,
  }))
  .handleAction(actions.menuGetFailure, (state, action) => ({
    ...state,
    error: action.payload,
    isFetching: false,
  }))
