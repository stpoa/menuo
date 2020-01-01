import { getMenu } from "./menus"
import { getTables } from "./orders"

const updateTable = table =>
  Object.assign(
    db.tables.find(t => t.id === table.id),
    table,
  )

export const readTables = getTables
