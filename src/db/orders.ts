import { MongoClient } from 'mongodb'

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

export interface IOrdersTables {
  restaurantId: string
  tables: IOrdersTable[]
}

export interface IOrdersTable {
  id: number
  status: string
  orders: IOrder[]
}

export interface IOrder {
  id: number
  tableId: number
  userId: 0
  items: IItem[]
  status: string
}

export interface IItem {
  dish: IDish
  variant: IVariant
  count: 1
  itemId: 0
  isDone: boolean
}

export interface IDish {
  name: string
  description?: string
  variants: IVariant[]
}

export interface IVariant {
  price: number
  name?: string
  description?: string
}

export interface Order {}
