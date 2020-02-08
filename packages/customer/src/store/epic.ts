import { menuGetEpic, menuRefetchEpic } from './menu/epic'
import { combineEpics } from 'redux-observable'

export const rootEpic = combineEpics(menuGetEpic, menuRefetchEpic)
