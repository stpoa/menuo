import { combineReducers } from 'redux'
import { dialogReducer } from './dialog/reducer'

export const uiReducer = combineReducers({
  dialog: dialogReducer,
})
