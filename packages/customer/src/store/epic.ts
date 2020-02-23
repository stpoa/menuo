import { menuGetEpic, menuRefetchEpic } from './menu/epic'
import { combineEpics } from 'redux-observable'
import { tableSetEpic } from './table/epic'
import { restaurantSetEpic } from './restaurant/epic'
import { userLanguageSetEpic } from './user/epic'

export const rootEpic = combineEpics(
  menuGetEpic,
  menuRefetchEpic,
  tableSetEpic,
  restaurantSetEpic,
  userLanguageSetEpic,
)
