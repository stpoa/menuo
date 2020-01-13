import { MongoClient, ObjectId } from 'mongodb'
import { Order } from 'menuo-shared'

const getOrdersCollection = <T = Omit<Order, '_id'> & { _id: ObjectId }>(
  client: MongoClient,
) => client.db('menuo').collection<T>('orders')

export const createOrder = (client: MongoClient) => async (
  order: Omit<Order, '_id'>,
) => {
  const db = getOrdersCollection<typeof order>(client)
  const result = await db.insertOne(order)
  return { _id: result.insertedId.toHexString() }
}

export const updateOrder = (client: MongoClient) => async ({
  _id,
  restaurant,
  ...updates
}: Partial<Order>) => {
  const db = getOrdersCollection(client)
  const result = await db.findOneAndUpdate(
    { _id: new ObjectId(_id), restaurant },
    { $set: updates },
  )
  return result.value
}

export const deleteOrder = (client: MongoClient) => async ({
  _id,
  restaurant,
}: {
  _id: string
  restaurant: string
}) => {
  const db = getOrdersCollection(client)
  const result = await db.deleteOne({ _id: new ObjectId(_id), restaurant })
  return result
}

export const deleteOrders = (client: MongoClient) => async ({
  restaurant,
  table,
  tableStatus,
}: {
  restaurant: string
  table: string
  tableStatus: string
}) => {
  console.log({ table, restaurant })
  const db = getOrdersCollection(client)
  const result = await db.deleteMany({
    restaurant,
    'table._id': table,
    'table.status': tableStatus,
  })
  return result
}
