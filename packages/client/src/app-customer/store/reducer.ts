import { combineReducers, Observable, AnyAction } from 'redux'
import { tableReducer } from './table/reducer'
import { menuReducer } from './menu/reducer'
import { basketReducer } from './basket/reducer'

export const rootReducer = combineReducers({
  menu: menuReducer,
  table: tableReducer,
  basket: basketReducer,
})
