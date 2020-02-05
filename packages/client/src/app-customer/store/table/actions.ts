import { createStandardAction } from 'typesafe-actions'

type Table = { name: string; status: string; _id: string; restaurant: string }
export const tableSet = createStandardAction('TABLE / SET')<Table>()
