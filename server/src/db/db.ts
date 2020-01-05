import { MongoClient } from 'mongodb'
import { Menu, MenuEntry, Order } from 'menuo-shared'
import { AGPHADB, WithDB } from 'src/lib/http'
import { APIGatewayProxyEvent, APIGatewayProxyCallback } from 'aws-lambda'
import { Context } from 'vm'
import { Table } from 'menuo-shared/interfaces/tables'

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
  const orders = await collection.find({ restaurant }).toArray()

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