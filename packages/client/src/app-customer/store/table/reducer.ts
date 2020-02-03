import { createReducer } from '@reduxjs/toolkit'
import * as actions from './actions'

const initialState = { name: '', status: '', _id: '', restaurant: '' }

export const tableReducer = createReducer(initialState, {
  [actions.setTable.type]: (state, action) => {
    return {
      ...state,
      ...action.payload.table,
    }
  },
})
