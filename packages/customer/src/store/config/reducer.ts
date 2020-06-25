import * as actions from './actions'
import { createReducer } from 'typesafe-actions'
import { RestaurantConfig } from '@menuo/shared'

const initialState = {
  config: {} as RestaurantConfig,
  isFetching: false,
}

export const configReducer = createReducer(initialState)
  .handleAction(actions.configGetRequest, state => ({
    ...state,
    isFetching: true,
  }))
  .handleAction(actions.configGetReceive, (state, action) => ({
    ...state,
    config: action.payload,
    isFetching: false,
  }))
  .handleAction(actions.configGetFailure, (state, action) => ({
    ...state,
    error: action.payload,
    isFetching: false,
  }))
