import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'

import { tableReducer } from './table/reducer'
import { menuReducer } from './menu/reducer'
import { configReducer } from './config/reducer'
import { basketReducer } from './basket/reducer'
import { restaurantReducer } from './restaurant/reducer'
import { uiReducer } from './ui/reducer'
import { userReducer } from './user/reducer'

export const createRootReducer = (history: any) =>
  combineReducers({
    router: connectRouter(history),
    menu: menuReducer,
    config: configReducer,
    table: tableReducer,
    basket: basketReducer,
    restaurant: restaurantReducer,
    ui: uiReducer,
    user: userReducer,
  })
