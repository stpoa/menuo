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
  const allTables: Table[] = orders.map(o => o.table)
  const tables: IOrdersTable[] = allTables.map(table => {
    const orders: IOrder[] = ordersPerTable[table.name].map(
      (o): IOrder => ({
        _id: o._id,
        items: o.entries.map(
          ([e, count]): IOrderItem => ({
            count,
            dishName: e.dishName,
            dishVariantPrice: e.dishVariantPrice,
            entry: e,
            status: o.status,
          }),
        ),
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
