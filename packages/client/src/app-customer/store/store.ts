import { createStore, applyMiddleware } from 'redux'
import { rootReducer } from './reducer'
import { rootEpic } from './epic'
import { createEpicMiddleware } from 'redux-observable'
import { composeWithDevTools } from 'redux-devtools-extension'

const epicMiddleware = createEpicMiddleware<any>()

export const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(epicMiddleware)),
)

epicMiddleware.run(rootEpic)
