import { createStore, applyMiddleware } from 'redux'
import { createBrowserHistory } from 'history'
import { createEpicMiddleware } from 'redux-observable'
import { composeWithDevTools } from 'redux-devtools-extension'
import { StateType } from 'typesafe-actions'
import { routerMiddleware } from 'connected-react-router'

import { createRootReducer } from './reducer'
import { rootEpic } from './epic'

export const history = createBrowserHistory()
const epicMiddleware = createEpicMiddleware<any>()

export const store = createStore(
  createRootReducer(history),
  composeWithDevTools(
    applyMiddleware(epicMiddleware, routerMiddleware(history)),
  ),
)

epicMiddleware.run(rootEpic)

export type RootState = StateType<ReturnType<typeof createRootReducer>>
