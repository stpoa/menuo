import { createReducer } from 'typesafe-actions'
import * as actions from './actions'

const initialState = { name: '', status: '', _id: '', restaurant: '' }

export const tableReducer = createReducer(initialState).handleAction(
  actions.tableSet,
  (state, action) => ({
    ...state,
    ...action.payload,
  }),
)
