import {
  IOrdersTables,
  Order,
  Orders,
  IOrder,
  IOrdersTable,
  IOrderItem,
} from '../interfaces/orders'
import { Tables } from '../interfaces/tables'
import { groupBy } from 'ramda'

type TablesOrders = [Tables, Orders]

export const nestOrdersTables = ([
  tablesFlat,
  orders,
]: TablesOrders): IOrdersTables => {
  const ordersPerTable = groupBy<Order>(o => o.table, orders)

  const tables: IOrdersTable[] = tablesFlat.map(table => {
    const orders: IOrder[] = ordersPerTable[table.name].map(o => {
      const items: IOrderItem[] = o.entries.map(
        ([e, count]): IOrderItem => ({
          count,
          dishName: e.dishName,
          status: o.status,
          itemId: e._id,
          dishVariantPrice: e.dishVariantPrice,
        }),
      )

      return {
        _id: o._id,
        user: o.user,
        items,
        status: o.status,
      }
    })

    return {
      _id: table._id,
      restaurant: table.restaurant,
      name: table.name,
      status: table.status,
      orders,
    }
  })

  return {
    restaurant: orders[0].restaurant,
    tables,
  }
}
