import { combineReducers, Observable, AnyAction } from 'redux'
import { combineEpics } from 'redux-observable'
import { menuReducer, menuEpic } from './menu'

export const rootReducer = combineReducers({
  menu: menuReducer,
})

export const rootEpic = combineEpics(menuEpic)
