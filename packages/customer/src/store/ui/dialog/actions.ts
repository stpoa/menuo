import { createStandardAction } from 'typesafe-actions'
import { DialogType } from './types'

export const uiDialogShow = createStandardAction('UI / DIALOG / SHOW')<
  DialogType
>()

export const uiDialogHide = createStandardAction('UI / DIALOG / HIDE')()
