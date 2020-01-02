import { MongoClient } from 'mongodb'
import { IOrder, IOrdersTables } from 'menuo-shared'

const getOrdersCollection = (client: MongoClient) =>
  client.db('menuo').collection<IOrdersTables>('orders')

export const createOrder = (client: MongoClient) => async (
  restaurantId: string,
  order: IOrder,
) => {
  const db = getOrdersCollection(client)
  await db.updateOne(
    { restaurantId },
    { $push: { [`tables.${order.tableId}.orders`]: order } },
  )
  return order
}

export const updateOrder = (client: MongoClient) => async (
  restaurantId: string,
  order: IOrder,
) => {
  const db = getOrdersCollection(client)
  await db.updateOne(
    { restaurantId },
    { $set: { [`tables.${order.tableId}.orders.${order.id}`]: order } },
  )
  return order
}

export const deleteOrder = (orderId: string) => {
  return orderId
}
