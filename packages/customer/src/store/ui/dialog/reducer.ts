import * as actions from './actions'
import { createReducer } from 'typesafe-actions'
import { DialogType } from './types'

const initialState = null

export const dialogReducer = createReducer<null | DialogType>(initialState)
  .handleAction(actions.uiDialogShow, (_, action) => action.payload)
  .handleAction(actions.uiDialogHide, () => null)
