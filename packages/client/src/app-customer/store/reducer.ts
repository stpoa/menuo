import { combineReducers, Observable, AnyAction } from 'redux'
import { tableReducer } from './table/reducer'
import { menuReducer } from './menu/reducer'

export const rootReducer = combineReducers({
  menu: menuReducer,
  table: tableReducer,
})
