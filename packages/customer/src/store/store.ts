import { createStore, applyMiddleware } from 'redux'
import { createHashHistory } from 'history'
import { createEpicMiddleware } from 'redux-observable'
import { composeWithDevTools } from 'redux-devtools-extension'
import { StateType } from 'typesafe-actions'
import { routerMiddleware } from 'connected-react-router'

import { createRootReducer } from './reducer'
import { rootEpic } from './epic'
import { init } from './actions'

export const history = createHashHistory()
const epicMiddleware = createEpicMiddleware<any>()

export const store = createStore(
  createRootReducer(history),
  composeWithDevTools(
    applyMiddleware(epicMiddleware, routerMiddleware(history)),
  ),
)

epicMiddleware.run(rootEpic)
store.dispatch(init())

export type RootState = StateType<ReturnType<typeof createRootReducer>>
