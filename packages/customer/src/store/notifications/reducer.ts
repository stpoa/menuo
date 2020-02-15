import * as actions from './actions'
import { createReducer } from 'typesafe-actions'

const initialState: { subscription: any } = { subscription: null }

export const notificationsReducer = createReducer(initialState)
  .handleAction(actions.notificationsSubscribeRequest, state => ({
    ...state,
    isRequesting: true,
  }))
  .handleAction(actions.notificationsSubscribeSuccess, (state, action) => ({
    ...state,
    subscription: action.payload,
  }))
  .handleAction(actions.notificationsSubscribeFailure, (state, action) => ({
    ...state,
    error: action.payload,
    isRequesting: false,
  }))
