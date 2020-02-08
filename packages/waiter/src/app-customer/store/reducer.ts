import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'

import { tableReducer } from './table/reducer'
import { menuReducer } from './menu/reducer'
import { basketReducer } from './basket/reducer'

export const createRootReducer = (history: any) =>
  combineReducers({
    router: connectRouter(history),
    menu: menuReducer,
    table: tableReducer,
    basket: basketReducer,
  })
