import { menuEpic } from './menu/epic'
import { combineEpics } from 'redux-observable'

export const rootEpic = combineEpics(menuEpic)
