import { getMenu } from "./restaurants"
import { getTables } from "./tables"

export const readMenu = getMenu

const createOrder = order => {
  db.orders.push(order)
  console.log({ orders: db.orders })
  return order
}

const updateOrder = order =>
  Object.assign(
    db.orders.find(o => o.id === order.id),
    order,
  )

const deleteOrder = orderId => {
  const index = db.orders.find(o => o.id === orderId).index
  db.orders.splice(index, 1)
}

const updateTable = table =>
  Object.assign(
    db.tables.find(t => t.id === table.id),
    table,
  )

export const readTables = getTables
