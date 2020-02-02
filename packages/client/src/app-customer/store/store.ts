import { combineReducers, createStore } from 'redux'
import { menuReducer } from './menu'

export const rootReducer = combineReducers({
  menu: menuReducer,
})

export const store = createStore(rootReducer)
