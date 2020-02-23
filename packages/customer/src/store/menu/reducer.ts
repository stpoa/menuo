import * as actions from './actions'
import { createReducer } from 'typesafe-actions'
import { MenuEntry } from '@menuo/shared'

const initialState = { dishes: [] as MenuEntry[], isFetching: false, query: '' }

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
  .handleAction(actions.menuFilter, (state, action) => ({
    ...state,
    query: action.payload,
  }))
