import { createAction } from '@reduxjs/toolkit'

export const setTable = createAction('SET_TABLE', (table: any) => ({
  payload: { table },
}))
