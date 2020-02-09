import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'

import { tableReducer } from './table/reducer'
import { menuReducer } from './menu/reducer'
import { basketReducer } from './basket/reducer'
import { restaurantReducer } from './restaurant/reducer'
import { uiReducer } from './ui/reducer'

export const createRootReducer = (history: any) =>
  combineReducers({
    router: connectRouter(history),
    menu: menuReducer,
    table: tableReducer,
    basket: basketReducer,
    restaurant: restaurantReducer,
    ui: uiReducer,
  })
