import { MongoClient, ObjectId } from 'mongodb'
import { Menu, MenuEntry, Order } from '@menuo/shared'
import { AGPHADB, WithDB } from 'src/lib/http'
import { APIGatewayProxyEvent, APIGatewayProxyCallback } from 'aws-lambda'
import { Context } from 'vm'
import { User, WaiterUser } from '@menuo/shared/interfaces/users'

const mongodbPassword = process.env.MONGODB_PASSWORD
const mongodbUrl = process.env.MONGODB_URL
const mongodbUser = process.env.MONGODB_USER

export const withDB = (f: AGPHADB) => (
  event: APIGatewayProxyEvent,
  ctx: WithDB<Context>,
  cb: APIGatewayProxyCallback,
) => {
  ctx.callbackWaitsForEmptyEventLoop = false

  // connect
  const uri = `mongodb+srv://${mongodbUser}:${mongodbPassword}@${mongodbUrl}`
  if (!ctx.dbClient) {
    MongoClient.connect(uri, { useNewUrlParser: true }).then(dbClient => {
      f(event, { ...ctx, dbClient } as any, cb)
        .then(result => {
          cb(null, result)
        })
        .catch(cb)
        .finally(() => dbClient.close())
    })
  }
}

export const getRestaurantDishes = (client: MongoClient) => async (
  restaurant: string,
): Promise<Menu> => {
  const collection = client.db('menuo').collection<MenuEntry>('menus')
  const menu = await collection.find({ restaurant }).toArray()

  return menu
}

export const getRestaurantOrders = (client: MongoClient) => async (
  restaurant: string,
): Promise<Order[]> => {
  const collection = client.db('menuo').collection<Order>('orders')
  const orders = await collection
    .find({ restaurant })
    .sort({ _id: -1 })
    .toArray()

  return orders
}

export const createWaiterUser = (client: MongoClient) => async ({
  deviceId,
  username,
  password,
  roles,
  restaurant,
  subscription,
}: Omit<WaiterUser, '_id'>) => {
  const collection = client
    .db('menuo')
    .collection<Omit<WaiterUser, '_id'>>('users')
  const user = await collection.insertOne({
    tables: [],
    subscription,
    restaurant,
    username,
    password,
    deviceId,
    roles,
  })
  return user.insertedId
}

export const getWaiterUser = (client: MongoClient) => async ({
  username,
}: Pick<WaiterUser, 'username'>) => {
  const collection = client.db('menuo').collection<WaiterUser>('users')
  const user = await collection.findOne({ username })
  return user
}

export const updateWaiterUser = (client: MongoClient) => async (
  { _id }: Pick<WaiterUser, '_id'>,
  updates: Partial<WaiterUser>,
) => {
  const collection = client.db('menuo').collection<WaiterUser>('users')
  return await collection.updateOne(
    { _id: new ObjectId(_id) },
    { $set: updates },
  )
}

export const getRestaurantWaiterUsers = (client: MongoClient) => async ({
  restaurant,
}: Pick<WaiterUser, 'restaurant'>) => {
  const collection = client.db('menuo').collection<WaiterUser>('users')
  const users = await collection.find({ restaurant }).toArray()
  return users
}
