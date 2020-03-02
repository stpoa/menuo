import { MongoClient } from 'mongodb'
import { AGPHADB, WithDB } from 'src/lib/http'
import { APIGatewayProxyEvent, APIGatewayProxyCallback } from 'aws-lambda'
import { Context } from 'vm'

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
