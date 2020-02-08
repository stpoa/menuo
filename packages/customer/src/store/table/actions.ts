import { createStandardAction } from 'typesafe-actions'

export const tableGet = createStandardAction('TABLE / GET')()

type Table = { name: string; status: string; _id: string; restaurant: string }
export const tableSet = createStandardAction('TABLE / SET')<Table>()
