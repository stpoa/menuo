import { createStore, applyMiddleware } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { createHashHistory } from 'history'
import { createEpicMiddleware } from 'redux-observable'
import { composeWithDevTools } from 'redux-devtools-extension'
import { StateType } from 'typesafe-actions'
import { routerMiddleware } from 'connected-react-router'

import { createRootReducer } from './reducer'
import { rootEpic } from './epic'

export const history = createHashHistory()
const epicMiddleware = createEpicMiddleware<any>()

const persistConfig = {
  key: 'root',
  storage,
}

export const store = createStore(
  persistReducer(persistConfig, createRootReducer(history)),
  composeWithDevTools(
    applyMiddleware(epicMiddleware, routerMiddleware(history)),
  ),
)

// export const persistor = persistStore(store)

epicMiddleware.run(rootEpic)

export type RootState = StateType<ReturnType<typeof createRootReducer>>
