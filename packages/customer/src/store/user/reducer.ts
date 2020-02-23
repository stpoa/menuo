import { createReducer } from 'typesafe-actions'
import * as actions from './actions'

const initialState = { language: 'en' }

export const userReducer = createReducer(initialState).handleAction(
  actions.userLanguageSet,
  (state, action) => ({
    ...state,
    language: action.payload,
  }),
)
