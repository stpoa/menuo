import {
  IOrdersTables,
  Order,
  Orders,
  IOrder,
  IOrdersTable,
  IOrderItem,
} from '../interfaces/orders'
import { Table } from '../interfaces/tables'
import { groupBy } from 'ramda'

export const nestOrders = (orders: Orders): IOrdersTables => {
  const ordersPerTable = groupBy<Order>(o => o.table.name, orders)
  const allTables: Table[] = Object.values(ordersPerTable).map(e => {
    return e.reduce(
      (acc, v) => {
        return {
          ...v.table,
          status:
            v.table.status && v.table.status !== 'empty'
              ? v.table.status
              : acc.status,
        }
      },
      { ...e[0].table, status: 'empty' },
    )
  })
  const tables: IOrdersTable[] = allTables.map(table => {
    const orders: IOrder[] = ordersPerTable[table.name].map(
      (o): IOrder => ({
        _id: o._id,
        items: o.entries
          .map(
            ([e, count]): IOrderItem => ({
              count,
              dishName: e.dishName,
              dishVariantPrice: e.dishVariantPrice,
              entry: e,
              status: o.status,
            }),
          )
          .filter(v => v.count),
        status: o.status,
        user: o.user,
      }),
    )

    return { orders, table }
  })

  return {
    restaurant: orders[0].restaurant,
    tables,
  }
}
