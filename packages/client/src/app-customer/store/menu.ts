import { createAction, createReducer } from '@reduxjs/toolkit'

const getMenuRequest = createAction('GET_MENU_REQUEST')
const getMenuReceive = createAction('GET_MENU_RECEIVE')
const getMenuFailure = createAction('GET_MENU_FAILIRE')

export type MenuActionTypes = never

const initialState = {}

export const menuReducer = createReducer(initialState, {
  [getMenuRequest.type]: (state, action) => state,
  [getMenuReceive.type]: (state, action) => state,
  [getMenuFailure.type]: (state, action) => state,
})
