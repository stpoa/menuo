import { combineReducers } from 'redux'
import { localizeReducer } from 'react-localize-redux'

export const userReducer = combineReducers({
  locale: localizeReducer,
})
