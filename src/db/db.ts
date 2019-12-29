import { MongoClient } from 'mongodb'
import { Menu } from './restaurants'
import { OrdersRestaurnat } from './tables'
import { AGPHADB, WithDB } from 'src/lib/http'
import { APIGatewayProxyEvent, APIGatewayProxyCallback } from 'aws-lambda'
import { Context } from 'vm'

// let cachedDb: MongoClient | null = null

// function connectToDatabase() {
//   const uri =

//   console.log('=> connect to database')

//   if (cachedDb) {
//     console.log('=> using cached database instance')
//     return Promise.resolve(cachedDb)
//   }

//   return MongoClient.connect(uri, { useNewUrlParser: true }).then(db => {
//     cachedDb = db
//     return cachedDb
//   })
// }

const mongodbPassword = process.env.MONGODB_PASSWORD

export const withDB = (f: AGPHADB) => (
  event: APIGatewayProxyEvent,
  ctx: WithDB<Context>,
  cb: APIGatewayProxyCallback,
) => {
  ctx.callbackWaitsForEmptyEventLoop = false

  // connect
  const uri =
    `mongodb+srv://menuo:${mongodbPassword}@menuo-u36ys.mongodb.net/test?retryWrites=true&w=majority`
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


export const getMenu = (client: MongoClient) => async (restaurantId: string): Promise<Menu> => {
  const collection = client.db('menuo').collection('menus')
  const menu = await collection.findOne({ restaurantId })

  return menu
}

export const getOrders = (client: MongoClient) => async (
  restaurantId: string,
): Promise<OrdersRestaurnat> => {
  const collection = client.db('menuo').collection('orders')
  const orders = await collection.findOne({ restaurantId })
  console.log({orders})

  return orders
}
