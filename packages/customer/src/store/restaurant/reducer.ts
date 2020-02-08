import { createReducer } from 'typesafe-actions'
import * as actions from './actions'

const initialState = ''

export const restaurantReducer = createReducer(initialState).handleAction(
  actions.restaurantSet,
  (_state, action) => action.payload,
)
