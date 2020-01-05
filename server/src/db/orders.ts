import { MongoClient } from 'mongodb'
import { Order } from 'menuo-shared'

const getOrdersCollection = <T = Order>(client: MongoClient) =>
  client.db('menuo').collection<T>('orders')

export const createOrder = (client: MongoClient) => async (
  order: Omit<Order, '_id'>,
) => {
  const db = getOrdersCollection<typeof order>(client)
  const result = await db.insertOne(order)
  return { _id: result.insertedId.toHexString() }
}

export const updateOrder = (client: MongoClient) => async (
  { _id, ...updates }: Partial<Order>,
) => {
  const db = getOrdersCollection(client)
  const result = await db.updateOne({ _id }, updates)
  return result
}

export const deleteOrder = (client: MongoClient) => async (
  order: Partial<Order>,
) => {
  const db = getOrdersCollection(client)
  const result = await db.deleteOne(order)
  return result 
}
