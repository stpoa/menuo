import { createStore, applyMiddleware } from 'redux'
import { rootReducer } from './reducer'
import { rootEpic } from './epic'
import { createEpicMiddleware } from 'redux-observable'
import { composeWithDevTools } from 'redux-devtools-extension'
import { StateType } from 'typesafe-actions'

const epicMiddleware = createEpicMiddleware<any>()

export const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(epicMiddleware)),
)

epicMiddleware.run(rootEpic)

export type RootState = StateType<typeof rootReducer>
