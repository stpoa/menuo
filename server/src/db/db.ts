import { MongoClient } from 'mongodb'
import { IOrdersTables, Menu, MenuEntry } from 'menuo-shared'
import { AGPHADB, WithDB } from 'src/lib/http'
import { APIGatewayProxyEvent, APIGatewayProxyCallback } from 'aws-lambda'
import { Context } from 'vm'

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

export const getMenu = (client: MongoClient) => async (
  restaurant: string,
): Promise<Menu> => {
  const collection = client.db('menuo').collection<MenuEntry>('menus')
  const menu = await collection.find({ restaurant }).toArray()
  console.log({ menu })

  return menu
}

export const getOrders = (client: MongoClient) => async (
  restaurantId: string,
): Promise<IOrdersTables> => {
  const collection = client.db('menuo').collection('orders')
  const orders = await collection.findOne({ restaurantId })
  console.log({ orders })

  return orders
}
