import { createStandardAction } from 'typesafe-actions'

export * from './menu/actions'
export * from './table/actions'
export * from './basket/actions'
export * from './restaurant/actions'
export * from './ui/actions'
export * from './user/actions'
export * from './config/actions'

export const init = createStandardAction('INIT')()
