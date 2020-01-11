import { MongoClient } from 'mongodb'
import { Menu, MenuEntry, Order } from 'menuo-shared'
import { AGPHADB, WithDB } from 'src/lib/http'
import { APIGatewayProxyEvent, APIGatewayProxyCallback } from 'aws-lambda'
import { Context } from 'vm'
import { Table } from 'menuo-shared/interfaces/tables'
import { User, RegisteredUser, WaiterUser } from 'menuo-shared/interfaces/users'

const mongodbPassword = process.env.MONGODB_PASSWORD

export const withDB = (f: AGPHADB) => (
  event: APIGatewayProxyEvent,
  ctx: WithDB<Context>,
  cb: APIGatewayProxyCallback,
) => {
  ctx.callbackWaitsForEmptyEventLoop = false

  // connect
  const uri = `mongodb+srv://menuo:${mongodbPassword}@menuo-u36ys.mongodb.net/test?retryWrites=true&w=majority`
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

export const getRestaurantTable = (client: MongoClient) => async (
  restaurant: string,
  name: string,
): Promise<Table | null> => {
  const collection = client.db('menuo').collection<Table>('tables')
  const table = await collection.findOne({ restaurant, name })

  return table
}

export const getUser = (client: MongoClient) => async (username: string) => {
  const collection = client.db('menuo').collection<User>('users')
  const user = await collection.findOne({ username })
  return user
}

export const createWaiterUser = (client: MongoClient) => async ({
  deviceId,
  username,
  password,
  roles,
  restaurant,
}: Omit<WaiterUser, '_id'>) => {
  const collection = client
    .db('menuo')
    .collection<Omit<WaiterUser, '_id'>>('users')
  const user = await collection.insertOne({
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
